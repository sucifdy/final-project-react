import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Heading, Spinner, Image, Select } from '@chakra-ui/react';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    fullname: '',
    address: '',
    phoneNumber: '',
    birthDate: '',
    gender: '',
    faculty: '',
    programStudy: '',
    image: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3001/students/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStudent(data);
      } catch (error) {
        console.error('Error fetching student:', error);
        setError('Failed to fetch student data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!student.fullname || !student.faculty || !student.programStudy) {
      alert('Please fill all required fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`http://localhost:3001/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });

      if (!response.ok) {
        throw new Error('Failed to update student');
      }

      navigate('/student'); // Navigate after successful update
    } catch (error) {
      console.error('Error updating student:', error);
      alert('Failed to update student. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={5}>
      {loading ? (
        <Box textAlign="center" p={5}>
          <Spinner size="xl" />
          <p>Loading ...</p>
        </Box>
      ) : (
        <Box as="form" onSubmit={handleSubmit}>
          <Image 
            alt="Student Image" 
            src="https://via.placeholder.com/100" 
            data-testid="profilePicture" 
          />
          <Heading as="h2" size="lg" mb={4}>
            Edit Student
          </Heading>
          {error && <Box color="red.500" mb={4}>{error}</Box>}
          
          <FormControl mb={4}>
            <FormLabel>Full Name</FormLabel>
            <Input
              name="fullname"
              value={student.fullname}
              onChange={handleChange}
              placeholder="Enter full name"
              data-testid="name"
              aria-label="Full Name"
              required
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              value={student.address}
              onChange={handleChange}
              placeholder="Enter address"
              data-testid="address"
              aria-label="Address"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Phone Number</FormLabel>
            <Input
              name="phoneNumber"
              value={student.phoneNumber}
              onChange={handleChange}
              placeholder="Enter phone number"
              data-testid="phoneNumber"
              aria-label="Phone Number"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Birth Date</FormLabel>
            <Input
              type="date"
              name="birthDate"
              value={student.birthDate}
              onChange={handleChange}
              data-testid="date"
              aria-label="Birth Date"
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Gender</FormLabel>
            <Select
              name="gender"
              value={student.gender}
              onChange={handleChange}
              data-testid="gender"
              aria-label="Gender"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Faculty</FormLabel>
            <Select
              name="faculty"
              value={student.faculty}
              onChange={handleChange}
              aria-label="Faculty"
            >
              <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
              <option value="Fakultas Ilmu Sosial dan Politik">Fakultas Ilmu Sosial dan Politik</option>
              <option value="Fakultas Teknik">Fakultas Teknik</option>
              <option value="Fakultas Teknologi Informasi dan Sains">Fakultas Teknologi Informasi dan Sains</option>
            </Select>
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Program Study</FormLabel>
            <Input
              name="programStudy"
              value={student.programStudy}
              onChange={handleChange}
              placeholder="Enter program study"
              data-testid="prody"
              aria-label="Program Study"
            />
          </FormControl>

          <Button mt={4} colorScheme="teal" type="submit" data-testid="edit-btn">
            Update Student
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default EditStudent;
