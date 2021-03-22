import React, { useState } from "react";

export const SummaryForm = () => {
  const [enableConfirmButton, setEnableConfirmButton] = useState(false);
  return (
    <div>
      <label htmlFor="terms-checkbox">Terms and Conditions</label>
      <input
        onClick={() => setEnableConfirmButton(!enableConfirmButton)}
        type="checkbox"
        name="terms-checkbox"
        id="terms-checkbox"
      />

      <button disabled={!enableConfirmButton}>Confirm order</button>
    </div>
  );
};
