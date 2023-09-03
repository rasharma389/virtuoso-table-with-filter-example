import { TableComponents, TableVirtuoso, TableVirtuosoHandle, VirtuosoHandle } from "react-virtuoso";
import { generateUsers, user } from "../data/data";
import React, { RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Resizable } from "react-resizable";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Toolbar } from "./Toolbar";
import { ColumnMenu } from "../components/ColumnMenu";
import { forEach } from "lodash";

// const TableComponents = {
//   Scroller: forwardRef((props: any, ref: any) => (
//     <TableContainer component={Paper} {...props} ref={ref} />
//   )),
//   Table: (props: any) => <Table {...props} style={{ borderCollapse: "separate" }} />,
//   TableHead: TableHead,
//   TableRow: TableRow,
//   TableBody: React.forwardRef((props, ref) => (
//     <TableBody {...props} ref={ref} /> || null
//   ))
// };

const VirtuosoTableComponents: TableComponents<any> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
        <TableContainer id='doc-table-container' {...props} ref={ref} component={Paper} sx={{ maxHeight: 'calc(100vh - 188px)' }} />
    )),
    Table: (props) => <Table {...props} stickyHeader />,
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
        <TableBody {...props} ref={ref} />
    ))
}

const createHeaders = (headers: any[]) => {
  return headers.map((item: any) => ({
    item: item,
    ref: useRef()
  }))
} 

export default function TableExample() {

  const [tableHeight, setTableHeight] = useState("auto");
  const [activeIndex, setActiveIndex] = useState(null);
  const tableElement = useRef<RefObject<VirtuosoHandle> | null>(null);
  

  const headers = useMemo(() => {
    return [
      { name: "name", colName: "name" },
      { name: "description", colName: "description" }
    ];
  }, []);

  const columns = createHeaders(headers);

  const [userData, setUserData] = useState<{ index: number; bgColor: string; name: string; initials: string; jobTitle: string; description: string; longText: string; }[] | null>(null);
  const [selectedColumn, setSelectedColumns] = useState<Array<{ name: any; colName: any; }>>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const [columnWidths, setColumnWidths] = useState<{name: number, description: number}>({
    name: 150, // Initial width for the "name" column
    description: 150, // Initial width for the "description" column
  });

  const handleResize = (columnKey: number, newWidth: number) => {
    console.log('hello', columnKey, newWidth)
    setColumnWidths({
      ...columnWidths,
      [columnKey]: newWidth,
    });
  };

  // const checkedItems = useMemo(() => {
  //   if (selectedColumn) {
  //     return selectedColumn.map((item) => item.colName);
  //   } else {
  //     return [];
  //   }
  // }, [selectedColumn]);

//   useEffect(() => {
//     debugger
//     console.log('ss2', generateUsers(100));
//   },[])

  // useEffect(() => {
  //   // if(tableElement && tableElement.current) {
  //     setTableHeight(`${tableElement?.current?.offsetHeight}px`);
  //   // }
  // }, [])

  useEffect(() => {
    // console.log(
    //   "dd",
    //   columns.map(({item, ref}) => item.colName)
    // );
   // console.log('ss', generateUsers(100), user);
    setUserData(
      generateUsers(100).filter((user) => { return user;
        // for (const key in columns) {
        //   if (user[`${key}` as string] !== columns[key]) {
        //     return false; // If any filter condition is not met, exclude the person
        //   }
        // }
        // return true; // All filter conditions are met, include the person
      })
    );
  }, [columns]);

  // useEffect(() => {
  //   if (checkedItems) {
  //     setSelectedColumns(
  //       columns.filter((item) => checkedItems.includes(item.colName))
  //     );
  //   }
  // }, [checkedItems, columns]);

  // useEffect(
  //   (col) => {
  //     if (checkedItems) {
  //       setSelectedColumns([
  //         ...selectedColumn,
  //         {
  //           name: col,
  //           colName: col
  //         }
  //       ]);
  //     }
  //   },
  //   [checkedItems, selectedColumn]
  // );

  const handleShowAll = () => {
    if(userData) {
        const allFields = Object.keys(userData[0]);
        setCheckedItems(allFields);

        let updatedColumns: Array<{ name: string, colName: string}> = []
        
        allFields.forEach(item => updatedColumns.push({ name: item, colName: item}));
        setSelectedColumns([...updatedColumns]);
    }
    
  }

  const handleHideAll = () => {
    setCheckedItems([]);
    setSelectedColumns([]);
  }

  const handleChange = useCallback(
    (event: any) => {
      // console.log(checkedItems, event.target.value);
      const col = event.target.value;
      const checked = event.target.checked;
      const foundItem = selectedColumn.find((item) => item.colName === col);
      if (foundItem) {
        if (!checked) {
          setCheckedItems(checkedItems.filter((item) => item !== col));
          setSelectedColumns(
            selectedColumn.filter((item) => item.colName !== col)
          );
        }
      } else {
        setCheckedItems([...checkedItems, col]);
        setSelectedColumns([
          ...selectedColumn,
          {
            name: col,
            colName: col
          }
        ]);
      }
    },
    [selectedColumn, checkedItems]
  );
  // console.log(selectedColumn, checkedItems, columns);
  const getItem = (item: any, user: any) => {
    if (item.colName === "bgColor") {
      return (
        <span style={{ background: `${user[item.colName]}` }}>
          {user[item.colName]}
        </span>
      );
    } else {
      return user[item.colName];
    }
  };
  return (
    <>
      {/* {userData &&
        Object.keys(userData[0]).map((item) => {
          return (
            <FormGroup key={item}>
              <FormControlLabel
                control={
                  <Checkbox
                    value={item}
                    checked={checkedItems.includes(item)}
                    onChange={(event) => handleChange(event)}
                  />
                }
                label={item}
              />
            </FormGroup>
          );
        })} */}
      {userData && <Toolbar>
        <ColumnMenu columns={Object.keys(userData[0])} checkedItems={checkedItems} handleChange={handleChange} handleShowAll={handleShowAll} handleHideAll={handleHideAll}/>
      </Toolbar>}
      {userData && checkedItems.length > 0 && (
        <TableVirtuoso
          style={{ height: '100vh' }}
          data={userData}
          components={VirtuosoTableComponents}
          fixedHeaderContent={() => (
            <TableRow>
              {selectedColumn &&
                selectedColumn.map((item) => (
                  <Resizable
                    key={item.colName}
                    width={200}
                    height={0}
                    onResize={(e: any, { size }: any) =>
                      handleResize(item.colName, size.width)
                    }
                  >
                    <TableCell
                      key={item.colName}
                      style={{ width: 150, background: "white", overflow: "hidden" }}
                    >
                      {item.name}
                    </TableCell>
                  </Resizable>
                ))}
            </TableRow>
          )}
          itemContent={(index, user) => (
            <>
              {selectedColumn &&
                selectedColumn.map((item) => (
                  <Resizable
                    key={item.colName}
                    width={200}
                    height={0}
                    onResize={(e: any, { size }: any) =>
                      handleResize(item.colName, size.width)
                    }
                  >
                    <TableCell
                      key={item.colName}
                      style={{
                        width: 150,
                        background: `${
                          item.colName === "bgColor" ? user[item.colName] : "#eee"
                        }`,
                        overflow: "hidden",
                      }}
                    >
                      {getItem(item, user)}
                    </TableCell>

                  </Resizable>

                ))}
            </>
          )}
        />
      )}
    </>
  );
}
