import {Button, Card, Container, Form, Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import './index.css'
import {handlePageClick, sortByDate, sortByName} from "./variables";
import User from "../User";

export default function Home() {
  const [data, setData] = useState([])
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [searchTerm, setSearchTerm] = useState('')
  const [show, setShow] = useState(false);
  const [ currentModalData, setCurrentModalData ] = useState([])

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    const result = data.filter(word => word.issue.id === id)
    setCurrentModalData([...result])
    setShow(true)
  };

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/data')
      setData(response.data.timelogs.nodes)
    } catch (e) {
      console.log(e)
      return e
    }
  }

  useEffect(() => {
    !data.length && getData()
  }, [data])

  useEffect(() => {
    const endOffset = itemOffset + 6;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / 6));
  }, [itemOffset, data]);


  return (
    <>
        <Container className='w-100 d-flex flex-column my-5'>
          <h1>Users</h1>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1"
                        onChange={e => setSearchTerm(e.target.value)}>
              <Form.Control type="text" placeholder="Username, title, description search"/>
            </Form.Group>
            <Button onClick={() => sortByDate(data, setData)} className='me-3'>Sort by date</Button>
            <Button onClick={() => sortByName(data, setData)}>Sort by name</Button>
          </Form>
          <div className='w-100 d-flex justify-content-center flex-wrap my-5'>
            {currentItems && currentItems.filter((val) => {
              if (searchTerm === "") {
                return val
              } else if (val.issue.title.toLowerCase().includes(searchTerm.toLowerCase()) || val.issue.description.toLowerCase().includes(searchTerm.toLowerCase()) || val.issue.author.username.toLowerCase().includes(searchTerm.toLowerCase())) {
                return val;
              }
            }).map((item, idx) => {
              return (
                <div key={idx} className='my-3'>
                  <Card style={{width: '18rem', padding: 20}}>
                    <Card.Body style={{padding: "20px 0"}}>
                      <h4>{item.issue.title}</h4>
                      <hr/>
                      <Card.Title>{item.issue.author.username}</Card.Title>
                      <Card.Text>
                        {item.issue.description}
                      </Card.Text>
                      <Button onClick={() => handleShow(item.issue.id)} variant="primary">Full info</Button>
                    </Card.Body>
                  </Card>
                </div>

              )
            })}
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={(event) => handlePageClick(event, data, setItemOffset)}
            pageRangeDisplayed={4}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
          <Modal show={show} onHide={handleClose}>
           <User handleClose={handleClose} data={currentModalData}/>
          </Modal>
        </Container>
    </>
  );
};