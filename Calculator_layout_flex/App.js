import React from "react";
import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function App() {
  const [currentNumber, setCurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState("");

  const allButtons = [
    "AC",
    "DEL",
    "%",
    "/",
    7,
    8,
    9,
    "*",
    4,
    5,
    6,
    "-",
    3,
    2,
    1,
    "+",
    0,
    ".",
    "+/-",
    "=",
    "<=",
  ];

  const calcular = () => {
    const splitNumbers = currentNumber.split(" ");
    const fistNumber = parseFloat(splitNumbers[0]);
    const lastNumber = parseFloat(splitNumbers[2]);
    const operator = splitNumbers[1];

    switch (operator) {
      case "+":
        setCurrentNumber((fistNumber + lastNumber).toString());
        return;
      case "-":
        setCurrentNumber((fistNumber - lastNumber).toString());
        return;
      case "*":
        setCurrentNumber((fistNumber * lastNumber).toString());
        return;
      case "/":
        setCurrentNumber((fistNumber / lastNumber).toString());
        return;
    }
  };

  const operationValue = (buttonPressed) => {
    if (
      (buttonPressed === "+") |
      (buttonPressed === "-") |
      (buttonPressed === "*") |
      (buttonPressed === "/")
    ) {
      setCurrentNumber(currentNumber + " " + buttonPressed + " ");
      return;
    }

    switch (buttonPressed) {
      case "DEL":
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;

      case "AC":
        setLastNumber("");
        setCurrentNumber("");
        return;

      case "=":
        setLastNumber(currentNumber + " = ");
        calcular();
        return;

      case "+/-":
        return;

      case "<=":
        setCurrentNumber(currentNumber.slice(0, -1));
        return;
    }

    setCurrentNumber(currentNumber + buttonPressed);
  };

  return (
    <View>
      <View style={styles.result}>
        <Text style={styles.historyValue}>{lastNumber}</Text>
        <Text style={styles.resultValue}>{currentNumber}</Text>
      </View>

      <View style={styles.digitsButtons}>
        {allButtons.map((button) =>
          button === "=" ? (
            <TouchableOpacity
              onPress={() => operationValue(button)}
              key={button}
              style={styles.button}
            >
              <Text style={styles.valueButton}>{button}</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => operationValue(button)}
              key={button}
              style={styles.button}
            >
              <Text style={styles.valueButton}>{button}</Text>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  result: {
    backgroundColor: "white",
    width: "100%",
    minHeight: 280,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },

  resultValue: {
    color: "black",
    margin: 10,
    fontSize: 40,
  },

  historyValue: {
    color: "black",
    fontSize: 20,
    marginRight: 10,
    alignSelf: "flex-end",
  },

  digitsButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  button: {
    borderColor: "black",
    backgroundColor: "#fff",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 90,
    minHeight: 90,
    display: "flex",
    flex: 2,
  },

  valueButton: {
    fontSize: 20,
    color: "black",
    fontSize: 30,
  },
});
