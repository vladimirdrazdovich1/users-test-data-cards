import {Button, Modal} from "react-bootstrap";

export default function User({handleClose, data}) {
  return (
    <>
      {data.length && data.map((item, index) => {
        return (
          <div key={index}>
            <Modal.Header className='w-100 f-flex flex-column align-items-start'>
              <h4>User timespent: {item.timeSpent}</h4>
              <h5>User timespent: {item.issue.author.name}</h5>
            </Modal.Header>
            <Modal.Body>
              <h3>{item.issue.title}</h3>
              <p>{item.issue.description}</p>
              <hr/>
            </Modal.Body>
            <div style={{wordWrap: "break-word", padding: 20}}>
              Web url: <a href={item.issue.webUrl}>{item.issue.webUrl}</a>
            </div>
          </div>
        )
      })}
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </>
  )
    ;
};