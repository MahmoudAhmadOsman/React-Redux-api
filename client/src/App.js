import React, { Component } from "react";
import moment from "moment";

import "./App.css";
import axios from "axios";

class App extends Component {
  // State for form items
  state = {
    title: "",
    author: "",
    body: "",
    //2 for getAllPost
    posts: [],
  };

  //4 getAllPost . Call this fucntion when component did mount
  componentDidMount = () => {
    this.getAllPost();
  };

  // GET ALl posts /1
  getAllPost = () => {
    axios
      .get("/api")
      .then((response) => {
        const data = response.data;
        //3 for getAllPost
        this.setState({ posts: data });
        console.log("Data has been fetched!");
      })
      .catch(() => {
        alert("Error occured while retrieving data!");
      });
  };

  //Desctruction the function data
  /*
      handleFormData = ({target}) => {
        const {name, value} = target;

          //Now update the state using setState() function
          this.setState({
            [name]: value,
          });
        };
*/

  handleFormData = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    //Now update the state //Dynamically pass the value of name
    this.setState({ [name]: value });
  };

  // On submit function
  submitHandler = (e) => {
    e.preventDefault();
    // alert(this.state.title + this.state.author + this.state.body);

    //Send the data to the server/MongoDB ---> this is the data you are sending to the server from the HTML form
    const payload = {
      title: this.state.title,
      author: this.state.author,
      body: this.state.body,
    };

    //alert(this.state.title + this.state.author + this.state.body);
    //Bring Axios in order to make post request
    axios({
      url: "/api/save",
      method: "POST",
      data: payload,
    })
      .then(() => {
        console.log("Successfully sumitted data!");
        //Call the function here
        this.resetFormInputData();
        //After a post is submitted, refresh the page and show post data
        this.getAllPost();
      })
      .catch(() => {
        console.log("Internal server error!");
      });
  };

  //Cleare the form data after submitting the form. Call this function after axios submits the form data successfully
  resetFormInputData = () => {
    this.setState({
      title: "",
      author: "",
      body: "",
    });
  };

  //Display all the posts now
  displayAllPost = (posts) => {
    if (!posts.length) return null;
    return posts.map((post, index) => (
      <div key={index} className="display_blog_post">
        <h3>
          <a href="#">{post.title}</a>
        </h3>
        <p>{post.body}</p>
        <span>
          <b>Author:</b> {post.author}
        </span>
        <p>
          <b>Published</b>: {moment().format("MM/DD/YYYY")}
        </p>
        <hr />
      </div>
      // post.publishedDate.format()
    ));
  };

  render() {
    console.log(this.state);
    return (
      <section className="container">
        <h1>Blog Post</h1> <hr />
        <div className="row">
          <div className="col-md-6 post__content" id="post__content">
            <h1 className="text-danger">All Posts</h1> <hr />
            {/* [posts] is comming from the State at the top */}
            {this.displayAllPost(this.state.posts)}
          </div>
          <div className="col-md-6" id="post_form">
            <h1 className="text-primary text-center">Post Your Post Here</h1>{" "}
            <hr />
            <form method="POST" onSubmit={this.submitHandler}>
              <div className="form-group">
                <label htmlFor="title" className="h5">
                  Post Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Enter post title"
                  onChange={this.handleFormData}
                  value={this.state.title}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="author" className="h5">
                  Author Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="author"
                  placeholder="Enter author name"
                  onChange={this.handleFormData}
                  value={this.state.author}
                />
              </div>

              <div className="form-group">
                <label htmlFor="body" className="h5">
                  Post Body
                </label>
                <textarea
                  type="text"
                  className="form-control"
                  name="body"
                  cols="8"
                  rows="8"
                  placeholder="Enter post body"
                  onChange={this.handleFormData}
                  value={this.state.body}
                ></textarea>
                <button className="btn btn-outline-primary mt-3 text-uppercase font-weight-bold">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}
export default App;