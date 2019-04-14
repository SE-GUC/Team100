import React, { Component } from "react";
import axios from "../../axiosInstance";

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
      this.setState({ albums: res.data.data  });
     })
    }

  refreshAlbums() {
    axios.get("/albums").then(res => {
      this.setState({ albums: res.data.data  });
     })
  }

  getMerchandise() {
    axios.get("/albums/type/Merchandise").then(res => {
        this.setState({ merchandise: res.data.data  });
       })
  }

refreshMerchandise() {
        axios.get("/albums/type/Merchandise").then(res => {
            this.setState({ merchandise: res.data.data  });
        })
    }

  handleChangeTitle = album => {
      this.setState({ title: album.target.value})
  }

  handleChangeDesc = album => {
      this.setState({ description: album.target.value})
  }

  handleChangeType = album => {
      this.setState({ type: album.target.value})
  }

  handleSubmit = async album => {
    album.preventDefault();
    const updatedAlbum = {
      title: album.target.title.value,
      description: album.target.description.value,
      type: album.target.type.value,
      photo: [album.target.photo.value]
    };
    console.log(updatedAlbum);
    try {
      await axios.put(
        `albums/${album.target.getAttribute("data-index")}`,
        updatedAlbum
      );
      this.refreshAlbums();
      this.refreshMerchandise();
    } catch (error) {
      console.log(error);
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
    console.log(newAlbum);
    try {
      await axios.post(`albums/`, newAlbum);
      this.refreshAlbums();
      this.refreshMerchandise();
    } catch (error) {
      console.log(error);
    }
  };

  onDelete = album => {
    axios
      .delete(`albums/${album.target.getAttribute("data-index")}`)
      .then(res => {
          this.refreshAlbums()
          this.refreshMerchandise()
      });
  };

  render() {
    return (
      <div>
        <h2>Albums</h2>
        {
          <ul>
            {this.state.albums.map((each, index) => (
              <div key={each._id}>
                <p>{each.title}</p>
                <form onSubmit={this.handleSubmit} data-index={each._id}>
                  Title:
                  <input type="text" name="title" defaultValue={each.title} />
                  Description:
                  <input
                    type="text"
                    name="description"
                    defaultValue={each.description}
                  />
                  Photo:
                  <input type="photo" name="photo" defaultValue={each.photo} />
                  Type:
                  <input type="text" name="type" defaultValue={each.type} />
                  <label>Uploaded at: </label>{each.uploaded_at}
                  <input type="submit" value="Submit" />
                  </form>
                  <button onClick={this.onDelete} data-index={each._id}>
                  Delete
                </button>
              </div>
            ))}
          </ul>
        }

        <h2>Merchandise</h2>
        {
          <ul>
            {this.state.merchandise.map((each, index) => (
              <div key={each._id}>
                <p>{each.title}</p>
                <form onSubmit={this.handleSubmit} data-index={each._id}>
                  Title:
                  <input type="text" name="title" defaultValue={each.title} />
                  Description:
                  <input
                    type="text"
                    name="description"
                    defaultValue={each.description}
                  />
                  Photo:
                  <input type="photo" name="photo" defaultValue={each.photo} />
                  Type:
                  <input type="text" name="type" defaultValue={each.type} />
                  <label>Uploaded at: </label>{each.uploaded_at}
                  <input type="submit" value="Submit" />
                  </form>
              </div>
            ))}
          </ul>
        }

        <h2>Create an album</h2>
        <form onSubmit={this.onCreate}>
          Title:
          <input type="text" name="title" onChange={this.handleChangeTitle} />
          Description:
          <input type="text" name="description" onChange={this.handleChangeDesc} />
          Photo:
          <input type="photo" name="photo" />
          Type:
          <input type="text" name="type" onChange={this.handleChangeType} />
          <input type="submit" value="Submit" />
        </form>

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