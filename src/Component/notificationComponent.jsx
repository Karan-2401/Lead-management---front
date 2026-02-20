import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import {
  Info,
  X,
  AlertTriangle,
  XCircle,
  ShieldAlert,
  ServerCrash,
  CheckCircle,
  BadgeCheck,
  InfoIcon,
} from "lucide-react";
const NotificationComponent = React.memo(({ data, action }) => {
  console.log("renderinc notification");
  const { Heading, Code, Text } = data;
  const [mainColor, setMainColor] = useState("");
  const xxxx = useCallback(() => {
    console.log("running");
    if (Code >= 400 && Code <= 500) {
      setMainColor("#FF0000"); // Red
    } else if (Code >= 100 && Code < 200) {
      setMainColor("#0000FF"); // Blue
    } else if (Code >= 200 && Code < 300) {
      setMainColor("#008000"); // Green
    } else if (Code >= 300 && Code < 400) {
      setMainColor("#FFFF00"); // Yellow
    } else if (Code === 500) {
      setMainColor("#800080"); // Purple
    } else {
      setMainColor("#FFFFFF"); // Default color (white) if code doesn't match any condition
    }
  }, [Code]);

  useEffect(() => {
    xxxx();
    setTimeout(() => action(false), 2000);
  }, [Code]);
  console.log(mainColor);

  return (
    <div
      className={`w-3/12 absolute bg-white py-4 bottom-5 right-4 px-2 rounded shadow flex flex-row justify-around items-center translate-y-0 opacity-0 animate-[fadeUp_0.4s_ease-out_forwards]`}
    >
      <div
        className={`rounded-full p-0.5 border-4 flex justify-center items-center`}
        style={{ color: mainColor }}
      >
        <AlertTriangle className="rounded-full " style={{ color: mainColor }} />
      </div>
      <div className="ps-5 pe-1">
        <X
          className={`text-${[mainColor]} justify-self-end hover:text-red-800 transition-all duration-200 cursor-pointer`}
          onClick={() => action(false)}
        />
        <h4 className={`text-md font-semibold `} style={{ color: mainColor }}>
          {Heading}
        </h4>
        <p className="text-400 text-sm">{Text}</p>
      </div>
    </div>
  );
});

export default NotificationComponent;
