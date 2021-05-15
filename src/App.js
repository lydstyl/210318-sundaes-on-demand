import Container from "react-bootstrap/Container";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import Router from "./Router";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <Router />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
