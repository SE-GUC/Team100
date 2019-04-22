import React, { Component } from "react";
import axios from "../../axiosInstance";
import Collapsible from "react-collapsible";
import { Typography, Paper, CardContent, Card, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

class Galleries extends Component {
  constructor() {
    super();
    this.state = {
      albums: [],
      merchandise: [],
      title: "",
      description: "",
      type: ""
    };
  }

  componentDidMount() {
    this.refreshAlbums();
    this.getGalleries();
    this.getMerchandise();
    this.refreshMerchandise();
  }

  getGalleries() {
    axios.get("/albums").then(res => {
      this.setState({ albums: res.data.data });
    });
  }

  refreshAlbums() {
    axios.get("/albums").then(res => {
      this.setState({ albums: res.data.data });
    });
  }

  getMerchandise() {
    axios.get("/albums/type/Merchandise").then(res => {
      this.setState({ merchandise: res.data.data });
    });
  }

  refreshMerchandise() {
    axios.get("/albums/type/Merchandise").then(res => {
      this.setState({ merchandise: res.data.data });
    });
  }

  handleChangeTitle = album => {
    this.setState({ title: album.target.value });
  };

  handleChangeDesc = album => {
    this.setState({ description: album.target.value });
  };

  handleChangeType = album => {
    this.setState({ type: album.target.value });
  };

  handleSubmit = async album => {
    album.preventDefault();
    const updatedAlbum = {
      title: album.target.title.value,
      description: album.target.description.value,
      type: album.target.type.value
      //photo: [album.target.photo.value]
    };
    try {
      await axios
        .put(`albums/${album.target.getAttribute("data-index")}`, updatedAlbum)
        .then(res => {
          this.refreshAlbums();
          this.refreshMerchandise();
          alert(res.data.msg);
        });
    } catch (error) {
      if (error.message === "Request failed with status code 404")
        alert("Please enter valid inputs");
      else if (error.message === "Request failed with status code 401")
        alert("You are unauthorized");
      else alert(error.message);
    }
  };

  onCreate = async album => {
    album.preventDefault();
    const newAlbum = {
      title: album.target.title.value,
      description: album.target.description.value,
      type: album.target.type.value,
      photo: [album.target.photo.value]
    };
    try {
      await axios.post(`albums/`, newAlbum).then(res => {
        this.refreshAlbums();
        this.refreshMerchandise();
        alert(res.data.msg);
      });
    } catch (error) {
      if (error.message === "Request failed with status code 404")
        alert("Please enter valid inputs");
      else if (error.message === "Request failed with status code 401")
        alert("You are unauthorized");
      else alert(error.message);
    }
  };

  onDelete = album => {
    axios
      .delete(`albums/${album.target.getAttribute("data-index")}`)
      .then(res => {
        this.refreshAlbums();
        this.refreshMerchandise();
        alert(res.data.msg);
      })
      //}
      .catch(error => alert("Unauthorized"));
    //{
    // if (error.message === "Request failed with status code 401")
    //   alert("You are unauthorized");
    // else alert(error.message);
    //}
  };

  render() {
    return (
      <div>
        <h2>Albums</h2>
        {
          <ul>
            {this.state.albums.map((each, index) => (
              <div key={each._id}>
                <Paper>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" component="h2" color="primary">
                        <p>{each.title}</p>
                        <br />
                        <form
                          onSubmit={this.handleSubmit}
                          data-index={each._id}
                        >
                          Title:
                          <input
                            type="text"
                            name="title"
                            defaultValue={each.title}
                          />
                          <br />
                          Description:
                          <input
                            type="text"
                            name="description"
                            defaultValue={each.description}
                          />{" "}
                          <br />
                          Photo:
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              window.location.href = `//${each.photo}`;
                            }}
                          >
                            {each.photo}
                          </a>{" "}
                          <br />
                          {/* {"Type: " + each.type}<br/>
                  {"Uploaded at: " + each.uploaded_at}<br /> */}
                          Type:
                          <input
                            type="text"
                            name="type"
                            defaultValue={each.type}
                          />
                          <br />
                          <label>Uploaded at: </label>
                          {each.uploaded_at}
                          <br />
                          <input type="submit" value="Submit" />
                        </form>
                      </Typography>
                      {localStorage.type === "mun_admin" ? (
                        <button onClick={this.onDelete} data-index={each._id}>
                          Delete
                        </button>
                      ) : null}
                    </CardContent>
                  </Card>
                </Paper>
              </div>
            ))}
          </ul>
        }

        <h2>Merchandise</h2>
        {
          <ul>
            {this.state.merchandise.map((each, index) => (
              <div key={each._id}>
                <Paper>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" component="h2" color="primary">
                        <p>{each.title}</p>
                        <br />
                        <form
                          onSubmit={this.handleSubmit}
                          data-index={each._id}
                        >
                          Title:
                          <input
                            type="text"
                            name="title"
                            defaultValue={each.title}
                          />
                          <br />
                          Description:
                          <input
                            type="text"
                            name="description"
                            defaultValue={each.description}
                          />{" "}
                          <br />
                          Photo:
                          <a
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              window.location.href = `//${each.photo}`;
                            }}
                          >
                            {each.photo}
                          </a>{" "}
                          <br />
                          Type:
                          <input
                            type="text"
                            name="type"
                            defaultValue={each.type}
                          />
                          <br />
                          <label>Uploaded at: </label>
                          {each.uploaded_at}
                          <br />
                          <input type="submit" value="Submit" />
                        </form>
                      </Typography>
                    </CardContent>
                  </Card>
                </Paper>
              </div>
            ))}
          </ul>
        }

        {localStorage.type === "mun_admin" ? (
          <Collapsible
            trigger={
              <Fab color="primary" aria-label="Add">
                <AddIcon />
              </Fab>
            }
          >
            <h2>Create an album</h2>
            <form onSubmit={this.onCreate}>
              Title:
              <input
                type="text"
                name="title"
                onChange={this.handleChangeTitle}
              />
              Description:
              <input
                type="text"
                name="description"
                onChange={this.handleChangeDesc}
              />
              Photo:
              <input type="photo" name="photo" />
              Type:
              <input type="text" name="type" onChange={this.handleChangeType} />
              <input type="submit" value="Submit" />
            </form>
          </Collapsible>
        ) : null}

        {/* <button onClick={this.onCreate}></button>
            {this.state.albums.map(album => (
              <div key={album._id}>
                <li>
                  {album.title},
                  {album.description}
                </li>
              </div>))
            } */}
      </div>
    );
  }
}
export default Galleries;
