import React, { useState } from "react";
import { useTable } from "react-table";
import { useFilters, useSortBy } from "react-table";

const columns = [
    {
        Header: "SL",
        accessor: "id"
    },
    {
        Header: "Name",
        accessor: "name"
    },
    {
        Header: "Code",
        accessor: "code"
    },
    {
        Header: "Availability",
        accessor: "availability"
    },
    {
        Header: "Need to Repair",
        accessor: "needing_"
    },
    {
        Header: "Durability",
        accessor: "durability"
    },
    {
        Header: "Mileage",
        accessor: "mileage"
    }
];

export default function Table({ data }) {
    // Create a state
    const [filterInput, setFilterInput] = useState("");
    
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    setFilter // The useFilter Hook provides a way to set the filter 
  } = useTable({
    columns,
    data
  }, 
    useFilters, // Adding the useFilters Hook to the table
    useSortBy // This plugin Hook will help to sort our table columns
  );


// Update the state when input changes
const handleFilterChange = e => {
    const value = e.target.value || undefined;
    setFilter("name", value); // Update the show.name filter. Now our table will filter and show only the rows which have a matching value
    setFilterInput(value);
  };

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
      <div>         

        <div className="col-md-3" style={{'float': 'right'}}>
            <div className="input-group mb-3">
                <input type="text" className="form-control"
                    placeholder="Search" value={filterInput || ''}
                    onChange={handleFilterChange}
                />
            </div>
        </div>
      
        <table {...getTableProps()} className="table table-striped table-bordered">
            <thead>
                {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}
                        className={
                            column.isSorted
                            ? column.isSortedDesc
                                ? "sort-desc"
                                : "sort-asc"
                            : ""
                        }
                        >
                        {column.render("Header")}
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>

    </div>
  );
}