import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import globalStyles from "C:/Users/sophi/itscooked/app/styles/styles";
import React, { useState, useEffect } from "react";

type MeatType = "chicken" | "cow" | "pig" | "fish";

interface MeatSafetyCheckerProps {
  meatType: MeatType;
  weight: number;
  onSafe?: () => void;
}

const MeatDonenessChecker: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Get parameters from navigation
  const meatType = params.animal as MeatType;
  const weight = parseFloat(params.weight as string);

  const [surfaceTemp, setSurfaceTemp] = useState<number>(160);
  const [internalTemp, setInternalTemp] = useState<number | null>(null);
  const [isSafe, setIsSafe] = useState<boolean | null>(null);
  const [isAlerting, setIsAlerting] = useState<boolean>(false);

  // FDA safe temperatures
  const SAFE_TEMPS: Record<MeatType, number> = {
    chicken: 165,
    pig: 145,
    cow: 145,
    fish: 145,
  };

  // Heat loss factors by meat type
  const HEAT_LOSS_FACTORS: Record<MeatType, number> = {
    chicken: 15,
    pig: 15,
    cow: 15,
    fish: 10,
  };

  // Automatic calculation whenever surfaceTemp changes
  useEffect(() => {
    calculateDoneness();
  }, [surfaceTemp]);

  const calculateDoneness = () => {
    const thicknessIn = Math.sqrt(weight);

    // Calculate estimated internal temperature
    const estimatedTemp =
      surfaceTemp - HEAT_LOSS_FACTORS[meatType] * thicknessIn;
    const roundedTemp = Math.round(estimatedTemp);

    setInternalTemp(roundedTemp);

    // Check if safe
    const safe = roundedTemp >= SAFE_TEMPS[meatType];
    setIsSafe(safe);

    // Trigger alert if safe
    if (safe) {
      setIsAlerting(true);
      router.push("/final");
      //   playAlert();
    } else {
      setIsAlerting(false);
    }
  };

  useEffect(() => {
    const internal = setInterval(async () => {
      const res = await fetch(
        "https://a116-169-234-65-184.ngrok-free.app/temp"
      );
      setSurfaceTemp(parseInt(await res.text()));
    }, 1000);

    return () => {
      clearInterval(internal);
    };
  });

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Meat Doneness Checker</Text>

      <Text style={globalStyles.subtitle}>
        Meat: {meatType} ({weight} oz)
      </Text>

      {internalTemp !== null && (
        <>
          <Text style={globalStyles.subtitle}>
            Surface Temp: {surfaceTemp}°F
          </Text>
          <Text style={globalStyles.subtitle}>
            Estimated Internal Temp: {internalTemp}°F
          </Text>

          <Text
            style={[globalStyles.subtitle, { color: isSafe ? "green" : "red" }]}
          >
            {isSafe ? "SAFE TO EAT" : "NOT SAFE YET"}
          </Text>
        </>
      )}
    </View>
  );
};

export default MeatDonenessChecker;
