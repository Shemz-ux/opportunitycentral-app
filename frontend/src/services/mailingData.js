const mockMailingList = [
  { id: 1, email: "john.doe@example.com", name: "John Doe", dateJoined: "March 15, 2026" },
  { id: 2, email: "jane.smith@company.com", name: "Jane Smith", dateJoined: "March 14, 2026" },
  { id: 3, email: "michael.brown@email.com", name: "Michael Brown", dateJoined: "March 13, 2026" },
  { id: 4, email: "sarah.wilson@domain.com", name: "Sarah Wilson", dateJoined: "March 12, 2026" },
  { id: 5, email: "david.lee@business.com", name: "David Lee", dateJoined: "March 11, 2026" },
  { id: 6, email: "emily.davis@org.com", name: "Emily Davis", dateJoined: "March 10, 2026" },
  { id: 7, email: "robert.taylor@mail.com", name: "Robert Taylor", dateJoined: "March 9, 2026" },
  { id: 8, email: "lisa.anderson@test.com", name: "Lisa Anderson", dateJoined: "March 8, 2026" },
  { id: 9, email: "james.thomas@sample.com", name: "James Thomas", dateJoined: "March 7, 2026" },
  { id: 10, email: "maria.garcia@demo.com", name: "Maria Garcia", dateJoined: "March 6, 2026" },
];

export function getMailingList() {
  return mockMailingList;
}