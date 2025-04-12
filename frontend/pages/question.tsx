import { Box, TextField, Typography, Skeleton } from '@mui/material';
import { useState } from 'react';
import { apiPost } from '../utils/api';
import { LoadingButton } from '@mui/lab';
import MarkdownRenderer from './MarkdownRenderer';

export default function QuestionComponent() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const handleAskQuestion = async () => {
    setAiLoading(true);
    try {
      const data = await apiPost('/ai', { question });
      setAnswer(data.answer);
    } catch (error) {
      console.error('Error in AI request:', error);
    } finally {
      setAiLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && question.trim()) {
      handleAskQuestion();
    }
  };

  return (
    <Box>
      <Typography variant="h5" component="h2" gutterBottom>
        Ask a question for me:
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          marginBottom: '1rem',
        }}
      >
        <TextField
          label="Enter your question..."
          variant="outlined"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          fullWidth
        />
        <LoadingButton
          variant="outlined"
          onClick={handleAskQuestion}
          loading={aiLoading}
          disabled={!question.trim()}
        >
          Ask Me!
        </LoadingButton>
      </Box>
      <Box>
        {aiLoading ? (
          <Skeleton variant="text" width="50%" height={30} />
        ) : (
          answer && (
            <Typography variant="body1" component="p">
              <MarkdownRenderer content={answer} />
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
}
