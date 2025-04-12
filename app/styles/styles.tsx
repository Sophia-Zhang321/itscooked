import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontFamily: "Jersey10-Regular",
    fontSize: 70,
    marginTop: 200,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: "#666",
    fontFamily: "VT323-Regular",
  },
  button: {
    width: "80%",
    backgroundColor: "#333",
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "VT323-Regular",
  },
});

export default globalStyles;