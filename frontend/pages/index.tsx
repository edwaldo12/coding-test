import 'dotenv';
import { Card, CardContent, Container } from '@mui/material';
import TableComponent from './table/table';
import QuestionComponent from './question/question';
import SalesDashboard from './charts';

const Home: React.FC = () => {
  return (
    <>
      <SalesDashboard />
      <Container>
        <Card
          sx={{
            marginBottom: '2rem',
          }}
        >
          <CardContent>
            <TableComponent />
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <QuestionComponent />
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Home;
