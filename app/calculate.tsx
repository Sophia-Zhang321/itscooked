import { Text, View, TextInput, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from "expo-router";
import globalStyles from "C:/Users/sophi/itscooked/app/styles/styles";
import React, { useState, useEffect } from 'react';


type MeatType = 'chicken' | 'beef' | 'pork' | 'fish';

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
    const [isAutoUpdate, setIsAutoUpdate] = useState<boolean>(true);


    // FDA safe temperatures
    const SAFE_TEMPS: Record<MeatType, number> = {
        chicken: 165,
        pork: 145,
        beef: 145,
        fish: 145
    };

    // Heat loss factors by meat type
    const HEAT_LOSS_FACTORS: Record<MeatType, number> = {
        chicken: 15,
        pork: 15,
        beef: 15,
        fish: 10
    };

    // Automatic calculation whenever surfaceTemp changes
    useEffect(() => {
        if (isAutoUpdate) {
            calculateDoneness();
        }
    }, [surfaceTemp, isAutoUpdate]);

    const calculateDoneness = () => {
        const thicknessIn = Math.sqrt(weight);
        
        // Calculate estimated internal temperature
        const estimatedTemp = surfaceTemp - (HEAT_LOSS_FACTORS[meatType] * thicknessIn);
        const roundedTemp = Math.round(estimatedTemp);
        
        setInternalTemp(roundedTemp);
        
        // Check if safe
        const safe = roundedTemp >= SAFE_TEMPS[meatType];
        setIsSafe(safe);
        
        // Trigger alert if safe
        if (safe) {
          setIsAlerting(true);
          setIsAutoUpdate(false);
          router.push('/final')
        //   playAlert();
        
        } else {
            setIsAlerting(false);
        }
        
    };

    // Simulate receiving temperature updates (remove in real implementation)
    const simulateTempUpdate = () => {
        const randomChange = Math.floor(Math.random() * 10) - 2; // -2 to +7
        setSurfaceTemp(prev => Math.max(100, prev + randomChange));
    };

    return (
        <View style={globalStyles.container}>
            <Text style={globalStyles.title}>Meat Doneness Checker</Text>
            
            <Text style={globalStyles.subtitle}>
                Meat: {meatType} ({weight} oz)
            </Text>
            
            {internalTemp !== null && (
                <>
                    <Text style={globalStyles.subtitle}>
                        Estimated Internal Temp: {internalTemp}°F
                    </Text>
                    <Text style={[
                        globalStyles.subtitle,
                        { color: isSafe ? 'green' : 'red' }
                    ]}>
                        {isSafe ? 'SAFE TO EAT' : 'NOT SAFE YET'}
                    </Text>
                </>
            )}
            
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                <Button 
                    title={isAutoUpdate ? "Auto Update: ON" : "Auto Update: OFF"} 
                    onPress={() => setIsAutoUpdate(!isAutoUpdate)}
                    color={isAutoUpdate ? 'green' : 'gray'}
                />
                <View style={{ width: 10 }} />
                <Button 
                    title="Manual Update" 
                    onPress={calculateDoneness}
                    disabled={isAutoUpdate}
                />
            </View>

            {/* For demo only - remove in production */}
            <Button 
                title="Simulate Temp Change" 
                onPress={simulateTempUpdate}
                color="orange"
            />

        </View>
    );
};

export default MeatDonenessChecker;
