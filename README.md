# DataTable React Component

## Installation

To install the `DataTable` component, you can use npm by running the following command:

```bash
npm install my-personal-table
```

## Usage

To use the `DataTable` component, you need to import it into your React application and pass an array of data as the `data` prop.

Here's an example of how you can import and use the `DataTable` component:

```jsx
import React from 'react';
import DataTable from 'my-personal-table';

const MyComponent = () => {
  const data = [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Jane Smith', age: 30 },
    { id: 3, name: 'Bob Johnson', age: 35 },
  ];

  return (
    <div>
      <h1>My Data Table</h1>
      <DataTable data={data} />
    </div>
  );
};

export default MyComponent;
```

## Props

The `DataTable` component accepts the following props:

- `data` (required): An array of objects representing the data to be displayed in the table. Each object should contain properties corresponding to the table columns.

## Contributions

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to create an issue or submit a pull request on the [GitHub repository](https://github.com/alex-cavaliere/react-data-table).
