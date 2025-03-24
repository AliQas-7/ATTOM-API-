# ATTOM API Integration

This project provides a Node.js API wrapper for the ATTOM Data Solutions API, offering endpoints for property and sales data retrieval.

## Features

- Property data retrieval by postal code and property type
- Sales data retrieval with various endpoints
- Automatic caching of API responses
- Request body-based API endpoints
- Error handling and validation

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- ATTOM API Key

## .env Setup
Set the env variables
- PORT=5000
- ATTOM_API_KEY=
- DATABASE_URL=

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AliQas-7/ATTOM-API-.git
cd ATTOM-API-
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your ATTOM API key:
```
ATTOM_API_KEY=your_api_key_here
```

## API Endpoints

### Property Endpoints
- `POST /api/property/address` - Get properties by postal code and type

### Sales Endpoints
- `POST /api/sales/snapshot` - Get sales snapshot
- `POST /api/sales/detail` - Get sale details
- `POST /api/sales/history/snapshot` - Get sales history snapshot
- `POST /api/sales/history/basic` - Get basic deed and mortgage history
- `POST /api/sales/history/expanded` - Get expanded deed and mortgage history
- `POST /api/sales/history/detail` - Get sales history details

## Usage Example

```javascript
// Example request to get properties by postal code
fetch('http://localhost:5000/api/property/address', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    postalcode: "08520",
    propertytype: "APARTMENT",
    orderby: "calendardate",
    page: 1,
    pagesize: 100
  })
});
```

## Error Handling

The API includes comprehensive error handling for:
- Missing required parameters
- Invalid API requests
- Database errors
- ATTOM API errors

## License

This project is licensed under the MIT License - see the LICENSE file for details. 
