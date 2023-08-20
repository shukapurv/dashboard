import { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { DataItem, Department, Props } from '../interfaces/dashboard';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  FormControlLabel,
  Button,
  IconButton,
} from '@mui/material';
import { ExpandMore, ArrowDropDown } from '@mui/icons-material';

function Dashboard({ departments }: Props) {
  const [data, setData] = useState<DataItem[]>([]);
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  const toggleExpansion = (panel: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [panel]: !prevExpanded[panel],
    }));
  };

  const handleDepartmentChange =
    (dept: Department) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelected((prevState) => {
        const updatedState = { ...prevState };
        if (event.target.checked) {
          updatedState[dept.department] = true;
          dept.sub_departments.forEach((subDept) => {
            updatedState[subDept] = true;
          });
        } else {
          updatedState[dept.department] = false;
          dept.sub_departments.forEach((subDept) => {
            updatedState[subDept] = false;
          });
        }
        return updatedState;
      });
    };

  const handleSubDepartmentChange =
    (subDept: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelected((prevState) => {
        const updatedState = { ...prevState };
        updatedState[subDept] = event.target.checked;

        // Check if all sub-departments of the current department are selected
        const department = departments.find((dept) =>
          dept.sub_departments.includes(subDept)
        );
        if (
          department &&
          department.sub_departments.every((sub) => updatedState[sub])
        ) {
          updatedState[department.department] = true;
        } else {
          if (department) {
            updatedState[department.department] = false;
          }
        }

        return updatedState;
      });
    };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts'
      );
      const jsonData = await response.json();
      setData(jsonData);
    };
    fetchData();
  }, []);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'userId', headerName: 'User ID', width: 100 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 },
  ];

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <DataGrid rows={data} columns={columns} />
      <hr />
      <div>
        {departments.map((dept, index) => (
          <Accordion key={index} expanded={expanded[dept.department] || false}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <IconButton onClick={() => toggleExpansion(dept.department)}>
                <ArrowDropDown />
              </IconButton>
              <FormControlLabel
                control={<Button>{dept.department}</Button>}
                label=""
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selected[dept.department] || false}
                    onChange={handleDepartmentChange(dept)}
                  />
                }
                label=""
              />
            </AccordionSummary>
            <AccordionDetails>
              <div>
                {dept.sub_departments.map((subDept, subIndex) => (
                  <FormControlLabel
                    key={subIndex}
                    control={
                      <Checkbox
                        checked={selected[subDept] || false}
                        onChange={handleSubDepartmentChange(subDept)}
                      />
                    }
                    label={subDept}
                  />
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
