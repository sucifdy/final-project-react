import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import {
  Box, Heading, Select, Table, Thead, Tbody, Tr, Th, Td, Button
} from '@chakra-ui/react';

const Student = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterFaculty, setFilterFaculty] = useState('All');

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3001/student');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/student/${id}`, {
        method: 'DELETE',
      });
      setStudents(students.filter((student) => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilterFaculty(e.target.value);
  };

  const filteredStudents = students.filter((student) => {
    if (filterFaculty === 'All') return true;
    return student.faculty === filterFaculty;
  });

  if (loading) {
    return <p>Loading ...</p>;
  }

  return (
    <Box p={5}>
      <Heading as="h2" size="lg" mb={4}>
        Student List
      </Heading>

      <Select
        id="filter"
        data-testid="filter"
        value={filterFaculty}
        onChange={handleFilterChange}
        mb={4}
      >
        <option value="All">All</option>
        <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
        <option value="Fakultas Ilmu Sosial dan Politik">Fakultas Ilmu Sosial dan Politik</option>
        <option value="Fakultas Teknik">Fakultas Teknik</option>
        <option value="Fakultas Teknologi Informasi dan Sains">Fakultas Teknologi Informasi dan Sains</option>
      </Select>

      <div className="test-table-container">
        <Table variant="striped" colorScheme="teal" className="test-table">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Image</Th>
              <Th>Full Name</Th>
              <Th>Faculty</Th>
              <Th>Program Study</Th>
              <Th>Option</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredStudents.map((student, index) => (
              <Tr key={student.id} className="student-data-row">
                <Td>{index + 1}</Td>
                <Td>
                  <img
                    src={student.image || "https://via.placeholder.com/50"}
                    alt={student.fullname}
                    style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                  />
                </Td>
                <Td>
                  <Link to={`/student/${student.id}`}>{student.fullname}</Link>
                </Td>
                <Td>{student.faculty}</Td>
                <Td>{student.programStudy}</Td>
                <Td>
                  <Button
                    data-testid={`delete-${student.id}`}
                    onClick={() => handleDelete(student.id)}
                    colorScheme="red"
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </Box>
  );
};

export default Student;