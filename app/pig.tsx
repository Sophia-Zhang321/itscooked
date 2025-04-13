import { useState } from 'react';
import { Text, View, Button, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback, Alert } from "react-native";
import { useRouter } from "expo-router";
import globalStyles from "C:/Users/sophi/itscooked/app/styles/styles";

export default function pig() {
  const router = useRouter();
  const [weight, setWeight] = useState('');
  const [isInputValid, setIsInputValid] = useState(true);

  const handleWeightChange = (text: string) => {
    // Allow only numbers and one decimal point
    const validInput = /^(\d+)?([.]?\d{0,2})?$/.test(text);
    if (validInput || text === '') {
      setWeight(text);
      setIsInputValid(true);
    }
  };

  const handleSubmit = () => {
    const numericWeight = parseFloat(weight);
    if (isNaN(numericWeight) || numericWeight <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid weight in ounces');
      setIsInputValid(false);
      return;
    }
    else{
      router.push({
        pathname: '/calculate',
        params: { weight: numericWeight, 
                  animal: 'pig' }})
    }
  }

return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>MEAT WEIGHT INPUT</Text>
      
      {/* Box Container for Weight Input */}
      <View style={globalStyles.inputBox}>
        <Text style={globalStyles.label}>ENTER WEIGHT (OUNCES):</Text>
        
        <View style={globalStyles.inputRow}>
          <TextInput
            style={[
              globalStyles.input,
              !isInputValid && globalStyles.invalidInput
            ]}
            placeholder={`0.00`}
            placeholderTextColor="#666"
            value={weight}
            onChangeText={handleWeightChange}
            keyboardType="numeric"
            maxLength={6}
          />
          
          <View style={globalStyles.unitDisplay}>
            <Text style={globalStyles.unitText}>oz</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[globalStyles.button, { marginTop: 30 }]}
        onPress={handleSubmit}
      >
        <Text style={globalStyles.buttonText}>COOK THIS MEAT</Text>
      </TouchableOpacity>
    </View>
  </TouchableWithoutFeedback>
);
}