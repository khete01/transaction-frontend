// import * as React from "react";
// import Button from "@mui/joy/Button";
// import FormControl from "@mui/joy/FormControl";
// import FormLabel from "@mui/joy/FormLabel";
// import Input from "@mui/joy/Input";
// import Modal from "@mui/joy/Modal";
// import ModalDialog from "@mui/joy/ModalDialog";
// import Stack from "@mui/joy/Stack";
// import Add from "@mui/icons-material/Add";
// import TextareaAutosize from "@mui/material/TextareaAutosize";
// import axios from "axios";

// const styles = {
//   button: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: "20px",
//     backgroundColor: "#0166FF",
//     color: "white",
//     width: "100px",
//     height: "32px",
//     border: "none",
//   },
//   type: {
//     display: "flex",
//   },
//   note: {
//     width: "250px",
//     height: "150px",
//   },
//   formSection: {
//     flex: 1,
//     padding: "0 20px",
//   },
//   formContainer: {
//     display: "flex",
//     gap: "20px",
//   },
//   submit: {
//     backgroundColor: "#0166FF",
//     borderRadius: "20px",
//   },
// };

// const categories = ["Food", "Shopping", "Bills", "Clothing"];

// export default function EditModalDialog({ transaction, onSave }) {
//   const [open, setOpen] = React.useState<boolean>(false);
//   const [amount, setAmount] = React.useState<string>(transaction.amount);
//   const [category, setCategory] = React.useState<string>(transaction.category);
//   const [date, setDate] = React.useState<string>(
//     transaction.createdAt.toISOString().split("T")[0]
//   );
//   const [note, setNote] = React.useState<string>(transaction.note);

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     const updatedTransaction = {
//       ...transaction,
//       category: category,
//       amount: amount,
//       createdAt: new Date(date),
//       note: note,
//     };

//     onSave(updatedTransaction);
//     setOpen(false);
//   };

//   return (
//     <React.Fragment>
//       <Button
//         style={styles.button}
//         variant="outlined"
//         startDecorator={<Add />}
//         onClick={() => setOpen(true)}
//       >
//         Edit
//       </Button>
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <ModalDialog>
//           <form onSubmit={handleSubmit} style={styles.formContainer}>
//             <div style={styles.formSection}>
//               <Stack spacing={2}>
//                 <FormControl>
//                   <FormLabel>Amount</FormLabel>
//                   <Input
//                     autoFocus
//                     required
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                   />
//                 </FormControl>
//                 <FormControl>
//                   <FormLabel>Category</FormLabel>
//                   <Input
//                     required
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     readOnly
//                   />
//                 </FormControl>
//                 <FormControl>
//                   <FormLabel>Date</FormLabel>
//                   <Input
//                     type="date"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                   />
//                 </FormControl>
//                 <Button type="submit" style={styles.submit}>
//                   Save Changes
//                 </Button>
//               </Stack>
//             </div>
//             <div style={styles.formSection}>
//               <FormControl>
//                 <FormLabel>Note</FormLabel>
//                 <TextareaAutosize
//                   style={styles.note}
//                   value={note}
//                   onChange={(e) => setNote(e.target.value)}
//                 />
//               </FormControl>
//             </div>
//           </form>
//         </ModalDialog>
//       </Modal>
//     </React.Fragment>
//   );
// }
