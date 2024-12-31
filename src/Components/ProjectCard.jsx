import PropTypes from 'prop-types'; // Import PropTypes
import { useState } from 'react';
import { Card, Col, Modal, Row } from 'react-bootstrap';

import { server_url } from '../services/serverurl';

function ProjectCard({ project }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card style={{ width: '18rem' }} className="shadow rounded mt-5 mb-3">
        <Card.Img src={`${server_url}/uploads/${project?.projectImage}`} width="100%" onClick={handleShow} />
        <Card.Body>
          <Card.Title>{project.title}</Card.Title>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Row>
            <Col>
              <img
                src={`${server_url}/uploads/${project?.projectImage}`}
                width="100%"
                alt=""
              />
            </Col>
            <Col>
              <h2 className="fw-bolder text-dark">{project?.title}</h2>
              <h5 className="fw-bolder">
                <span className="text-warning">Languages Used</span>:
                {project?.languages}
              </h5>
              <p className="fw-bolder">
                <span className="text-success">Overview</span>:
                {project?.overview}
              </p>
            </Col>
          </Row>
          <div className="mt-2">
            <a
              href={project?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="me-3 btn text-dark"
            >
              <i className="fa-brands fa-github fa-2x"></i>
            </a>
            <a
              href={project?.website}
              target="_blank"
              rel="noopener noreferrer"
              className="me-3 btn text-dark"
            >
              <i className="fa-solid fa-link fa-2x"></i>
            </a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

// Define PropTypes
ProjectCard.propTypes = {
  project: PropTypes.shape({
    projectImage: PropTypes.string,
    title: PropTypes.string,
    languages: PropTypes.string,
    overview: PropTypes.string,
    github: PropTypes.string,
    website: PropTypes.string,
  }).isRequired,
};

export default ProjectCard;
