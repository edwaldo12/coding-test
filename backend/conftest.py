import pytest
from fastapi.testclient import TestClient
from main import app
from unittest.mock import patch, MagicMock

@pytest.fixture
def client():
    return TestClient(app)

@pytest.fixture
def mock_google_api():
    with patch('google.genai.Client') as mock_client:
        mock_response = MagicMock()
        mock_response.text = "Mocked AI response"
        mock_client.return_value.models.generate_content.return_value = mock_response
        yield mock_client