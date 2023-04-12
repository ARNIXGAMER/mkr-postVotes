import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import data from "../src/Data/posts";
import { Card, Button, ButtonGroup } from "react-bootstrap";

function App() {
  const [isDescending, setIsDescending] = useState(true);
  const [list, setList] = useState(data)

  const handleAsc = () => {
    setList(prevList => {
      const newList = [...prevList].sort((a, b) => a.votes - b.votes);
      setIsDescending(false);
      return newList;
    });
  };
  const handleDes = () => {
    setList(prevList => {
      const newList = [...prevList].sort((a, b) => b.votes - a.votes);
      setIsDescending(true);
      return newList;
    });
  };

  const handlePlus = async (id) => {
    setList(prevList =>{
      const newList = prevList.map(post =>{
        if (post.id === id) {
          return {...post, votes: post.votes + 1}
          }
          return post;
      });
      return newList
    })
  }
  const handleMinus = (id) => {
    setList(prevList =>{
      const newList = prevList.map(post =>{
        if (post.id === id) {
          return {...post, votes: post.votes - 1}
          }
          return post;
      });
      return newList
    })
  };

  useEffect(() => {
    if (isDescending) {
      handleDes();
    } else {
      handleAsc();
    }
    console.log(isDescending);
    console.log(list);
  }, [list,isDescending]);
  return (
    <div>
      <div className="App-intro">
        <h1>Welcome to the posts</h1>
      </div>
      <div>
        <div style={{ width: "90vw" }}>
          <h2>Posts</h2>
          <div style={{ display: "flex", gap: "5px", marginLeft: "15%" }}>
            <p>Ordenar por: </p>
            <ButtonGroup>
              <Button
                onClick={() => setIsDescending(false)}
                variant={isDescending ? "secondary" : ""}
              >
                Ascendente
              </Button>
              <Button
                onClick={() => setIsDescending(true)}
                variant={!isDescending ? "secondary" : ""}
              >
                Descendente
              </Button>
            </ButtonGroup>
          </div>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: 0,
              padding: 0,
            }}
          >
            {list.map((post, index) => (
              <li key={index} style={{ width: "80%", margin: "20px 0 20px 0" }}>
                <Card
                  style={{
                    width: "80%",
                    height: "15rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    margin: 0,
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={post.post_image_url}
                    style={{ width: "18rem" }}
                  />
                  <div style={{ width: "100%" }}>
                    <Card.Body>
                      <Card.Title>
                        <a href={post.url} target="_blank">{post.title}</a>
                      </Card.Title>
                      <Card.Text>{post.description}</Card.Text>
                      <blockquote
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        Escrito por:
                        <img
                          src={post.writer_avatar_url}
                          style={{
                            width: "3rem",
                            height: "3rem",
                            borderRadius: "50px",
                          }}
                        />
                      </blockquote>
                    </Card.Body>
                  </div>
                  <Card.Footer
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 15 + "px",
                      height: "4rem",
                    }}
                  >
                    <Button
                      variant="primary"
                      onClick={() => handlePlus(post.id)}
                    >
                      +
                    </Button>
                    <p>{post.votes}</p>
                    <Button
                      variant="primary"
                      onClick={() => handleMinus(post.id)}
                    >
                      -
                    </Button>
                  </Card.Footer>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
