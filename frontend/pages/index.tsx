import 'dotenv';
import { Box, Card, CardContent, Container } from '@mui/material';
import TableComponent from './table';
import QuestionComponent from './question';

export default function Home() {
  return (
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
  );
}
