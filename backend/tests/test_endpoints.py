def test_get_data_basic(client): 
    response = client.get(
        "/api/data?page=0&pageSize=5",
        headers={"Origin": "http://localhost:3000"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "salesReps" in data
    assert len(data["salesReps"]) == 5  
    assert data["total"] == 15  
    assert "access-control-allow-origin" in response.headers

def test_get_data_search_filter(client):
    response = client.get("/api/data?search=John&page=0&pageSize=5")
    data = response.json()
    assert all("John" in rep["name"] or 
               "John" in rep["role"] or 
               "John" in rep["region"] 
               for rep in data["salesReps"])

def test_get_data_sorting(client):
    response = client.get("/api/data?sortField=deals&sortOrder=asc")
    data_asc = response.json()
    response_desc = client.get("/api/data?sortField=deals&sortOrder=desc")
    data_desc = response_desc.json()
    assert data_asc["salesReps"] != data_desc["salesReps"]
    
def test_ai_endpoint_success(client, mock_google_api):
    response = client.post("/api/ai", json={"question": "Test query"})
    assert response.status_code == 200
    assert "answer" in response.json()
    mock_google_api.assert_called_once()

def test_ai_endpoint_missing_key(client, monkeypatch):
    monkeypatch.delenv("GOOGLE_API_KEY", raising=False)
    response = client.post("/api/ai", json={"question": "Test"})
    assert response.status_code == 400  
    assert "API key not found" in response.text
    
def test_cors_headers(client):
    response = client.get("/api/data", headers={
        "Origin": "http://localhost:3000"
    })
    assert response.headers["access-control-allow-origin"] == "http://localhost:3000"
    assert "access-control-allow-credentials" in response.headers