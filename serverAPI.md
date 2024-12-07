# aiCoder API Documentation

This documentation provides a complete reference for all the available API endpoints provided by `aiCoderApiFunctions`. These APIs are designed to be accessed via AJAX from the frontend, facilitating interaction with a back-end system for developing a front-end application.

### Endpoint Details

### Add Message
- **Endpoint**: `/addMessage`
- **Method**: POST
- **Request Body**:
```
{
    "id": "string",
    "message": "string"
}
```
- **Response**:
```
{
    "status": "string",
    "messageId": "string"
}
```

### Get Messages
- **Endpoint**: `/getMessages`
- **Method**: GET
- **Response**:
```
{
    "messages": [
        {
            "messageId": "string",
            "message": "string",
            "timestamp": "string"
        }
    ]
}
```

### Delete Message
- **Endpoint**: `/deleteMessage`
- **Method**: DELETE
- **Request Body**:
```
{
    "messageId": "string"
}
```
- **Response**:
```
{
    "status": "string"
}
```

