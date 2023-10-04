import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Layout from '@/components/layouts/Layout'
import { useAuth } from '@/context/AuthProvider';

export default function Home() {

  const hola = useAuth();

  console.log(hola);




  return (
    <Layout>
      <div style={{ marginTop: 70 }}>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="https://www.freeiconspng.com/thumbs/calendar-icon-png/calendar-icon-png-4.png" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="outline-secondary" >Go somewhere</Button>
          </Card.Body>
        </Card>
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
