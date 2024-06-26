import * as React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MultiInputTimeRangeField } from '@mui/x-date-pickers-pro/MultiInputTimeRangeField';
import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';

export default function BasicTimeRangeField() {

    const [singleInputValue, setSingleInputValue] = React.useState(null);

    const handleSingleInputChange = (newValue) => {
        setSingleInputValue(newValue);
    }

    console.log(singleInputValue)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={['MultiInputTimeRangeField', 'SingleInputTimeRangeField']}
      >
        <MultiInputTimeRangeField
          slotProps={{
            textField: ({ position }) => ({
              label: position === 'start' ? 'From' : 'To',
            }),
          }}
        />
        <SingleInputTimeRangeField label="From - To" 
                  value={singleInputValue}
                  onChange={handleSingleInputChange}
         />
      </DemoContainer>
    </LocalizationProvider>
  );
}

