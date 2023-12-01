import Layout from '@/components/layouts/Layout'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const tarjetas = [
  {
    to: '/calendario',
    src: 'https://www.freeiconspng.com/thumbs/calendar-icon-png/calendar-icon-png-4.png',
    title: 'Calendario',
    description: 'Control sobre tus dias'
  },
  {
    to: '/tareas',
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Jx8LO5f9mYKA17fVL1Pmlk5AKtdhEeqIZME8ypGmV8skCOpqewMBRXr-CK-LIdiAcKc&usqp=CAU',
    title: 'Tareas',
    description: 'Control detallado de tus tareas'
  },
  {
    to: '/informes',
    src: 'https://cdn-icons-png.flaticon.com/512/217/217808.png',
    title: 'Informes',
    description: 'Informes de tus tareas'
  }
]

function TarjetaPresentacion({ to, src, title, description }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Link to={to}>
        <Card.Img variant="top" src={src} />
      </Link>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default function Home() {

  return (
    <Layout>
      <div className='d-flex gap-3 justify-content-center flex-wrap' style={{ marginTop: 70 }}>
        {
          tarjetas.map(({ to, src, title, description }) => (<TarjetaPresentacion key={to} to={to} src={src} title={title} description={description} />))
        }
      </div>

      {/*<!-- Card -->
<div
  class="bg-image card shadow-1-strong"
  style="background-image: url('https://mdbcdn.b-cdn.net/img/new/slides/003.webp');"
>
  <div class="card-body text-white">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">
      Some quick example text to build on the card title and make up the bulk of the
      card's content.
    </p>
    <a href="#!" class="btn btn-outline-light">Button</a>
  </div>
</div>
<!-- Card -->*/}
    </Layout>
  )
}
