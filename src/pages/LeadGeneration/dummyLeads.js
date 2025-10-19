export const dummyLeads = Array.from({ length: 50 }, (_, i) => {
  const firstNames = [
    "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Reyansh", "Krishna", "Ishaan", "Rohan",
    "Ananya", "Diya", "Aadhya", "Kiara", "Myra", "Ira", "Anika", "Saanvi", "Aarohi", "Navya",
    "Esha", "Tara", "Meera", "Riya", "Nisha", "Kavya", "Maya", "Priya", "Isha", "Neha",
    "Aravind", "Kiran", "Suresh", "Pranav", "Siddharth", "Harini", "Lakshmi", "Preethi", "Divya", "Sneha",
    "Vikas", "Anil", "Deepak", "Manish", "Rahul", "Nitin", "Abhishek", "Amit", "Ravi", "Karthik"
  ];

  const lastNames = [
    "Sharma", "Patel", "Reddy", "Iyer", "Nair", "Singh", "Verma", "Mehta", "Joshi", "Ghosh",
    "Pillai", "Das", "Bose", "Naidu", "Kapoor", "Chopra", "Rao", "Menon", "Gupta", "Bhat"
  ];

  const domains = ["gmail.com", "yahoo.com", "outlook.com", "example.com", "hotmail.com"];

  const name = `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`;
  const email = `${name.replace(/\s+/g, ".").toLowerCase()}@${domains[i % domains.length]}`;
  const phoneNumber = `+91${Math.floor(9000000000 + Math.random() * 999999999)}`;
  const createdAt = new Date(
    Date.now() - Math.floor(Math.random() * 60 * 24 * 60 * 60 * 1000)
  ); // random date within ~2 months

  return {
    id: i + 1,
    name,
    email,
    phoneNumber,
    createdAt,
  };
});
