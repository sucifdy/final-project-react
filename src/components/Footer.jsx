import { Box } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box className="footer">
    <p className="studentName" data-testid="studentName">SUCI FITRIYAH DARMAYANTI</p>
    <span>-</span>
    <p className="studentId" data-testid="studentId">FS12194279</p>
  </Box>
  );
};

export default Footer;