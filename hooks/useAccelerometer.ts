import { useEffect, useState } from "react";
import { accelerometer } from "react-native-sensors";

export function useAccelerometer() {
  const [isFaceDown, setIsFaceDown] = useState<boolean>(false);

  useEffect(() => {
    const subscription = accelerometer.subscribe(({ z }) => {
      //console.log(z);

      setIsFaceDown((prev) => {
        if (prev === false && z >= 0.95) return true;
        if (prev === true && z <= -0) return false;
        return prev;
      });

      if (isFaceDown) console.log(`Phone is face down`);
      if (!isFaceDown) console.log(`Phone is face up`);
    });

    return () => subscription.unsubscribe();
  }, [isFaceDown]);

  return isFaceDown;
}
