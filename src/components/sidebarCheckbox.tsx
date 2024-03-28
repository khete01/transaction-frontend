function Checkbox(type) {
  return (
    <div>
      <input type="checkbox" name={type} value={type} style={styles.checkBox} />
      <label htmlFor={type}>{type}</label>
    </div>
  );
}
const styles = {
  checkBox: {
    borderRadius: "50px",
  },
};
export default Checkbox;
