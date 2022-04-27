import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { FlatGrid } from "react-native-super-grid";

export default function App() {
  const [currentNumber, setCurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState("");

  const allButtons = [
    { name: "AC" },
    { name: "DEL" },
    { name: "%" },
    { name: "/" },
    { name: "7" },
    { name: "8" },
    { name: "9" },
    { name: "*" },
    { name: "4" },
    { name: "5" },
    { name: "6" },
    { name: "-" },
    { name: "1" },
    { name: "2" },
    { name: "3" },
    { name: "+" },
    { name: "0" },
    { name: "." },
    { name: "+/-" },
    { name: "=" },
    { name: "<=" },
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

      <FlatGrid
        data={allButtons}
        renderItem={({ item, index }) => (
          <View>
            {item.name === "=" ? (
              <TouchableOpacity
                onPress={() => operationValue(item.name)}
                key={item.name}
                style={styles.button}
              >
                <Text style={styles.valueButton}>{item.name}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => operationValue(item.name)}
                key={item.name}
                style={styles.button}
              >
                <Text style={styles.valueButton}>{item.name}</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
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
  },

  button: {
    borderColor: "black",
    backgroundColor: "#fff",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60,
    minHeight: 60,
    flex: 2,
  },

  valueButton: {
    color: "black",
    fontSize: 30,
  },
});
