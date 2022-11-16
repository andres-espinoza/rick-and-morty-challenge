/* eslint-disable react/jsx-key */
/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SyntheticEvent, useEffect, useState } from 'react';
import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
} from '@mui/material/Autocomplete';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {
  Chip,
  Stack,
  Typography,
  ListItem,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import ListboxVirtualizedComponent from './ListboxVirtualizedComponent';
import StyledPopper from './StyledPopper';
import CustomPaper from './CustomPaper';
import customScroll from './customScrollbar';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export enum DataType {
  Driver,
  Terminus,
  other,
}
export interface AutocompleteMultiSelectorProps<T> {
  limit?: number;
  dataSource: T[];
  selectedData: T[];
  renderFunc: (dataSource: T) => string;
  label?: string;
  addAll?: boolean;
  onChange: (
    event: SyntheticEvent,
    value: T[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<T>
  ) => void;
}
// * Ejemplos de uso
// const employeeDataObject: AutocompleteMultiSelectorProps<IEmployee> = {
//   limit: 1,
//   dataSource: [],
//   renderFunc: (e) => `${e.rut} / ${e.fullname}`,
//   label: 'Conductores',
//   addAll: true,
//   type: DataType.Driver
// };

// employeeDataObject.onChange = (_e, data) => {
//   dispatch(setSelectedEmployees(data));
// };

// * El componente está diseñado para funcionar en un contexto de estado global

// * dataSource -> slice del estado global que llena los inputs (todos los trabajadores, todos los terminales, etc.)

// * selectedData -> slice del estado global encargado de almacenar la data filtrada

// * onChange -> función encargada de actualizar el slice de selectedData con los items seleccionados dentro del componente.

// * renderFunc -> función customizada para darle formato a las opciones desplegadas en el componente

const AutocompleteMultiSelector = (
  props: AutocompleteMultiSelectorProps<any>
) => {
  const {
    limit = 1,
    dataSource,
    renderFunc,
    label = '',
    addAll,
    onChange,
    selectedData,
  } = props;

  // variable para controlar si el input está deshabilitado o no
  const disabled = !dataSource || dataSource.length < 1;

  const initialShrink = selectedData && selectedData.length > 0;

  // variable para controlar la animación del label
  const [shrink, setShrink] = useState(initialShrink);

  // Se copia la data recibida a un nuevo array, sevirá para agregar la opción 'All'
  const newDataSource = [...dataSource];

  // Estado local para guardar el valor ingresado en el input, así cuando se seleccione una opción, no se borre lo escrito (comportamiento por defecto)
  const [inputValue, setInputValue] = useState('');

  // Se define un estado local para seleccionar items
  const [{ selectedItems, allSelected }, setSelectedItem] = useState<{
    selectedItems: any[];
    allSelected: boolean;
  }>({
    selectedItems: [],
    allSelected: false,
  });

  // * Función accesoria para representa la opción 'Todos' en la lista
  const newRenderFunction = (item: any) => {
    if (item?.value === 'All') return 'Select All';
    return renderFunc(item);
  };

  // Acá se subentiende que los items tienen una propiedad id
  // Si no tiene un All, lo agrega como primera opción cuando addAll es pasado como true
  if (addAll && newDataSource.findIndex((i) => i.id === 0) === -1)
    newDataSource.unshift({ id: 0, value: 'All' });

  useEffect(() => {
    // Pregunta si hay data seleccionada previamente en el slice de filtro
    if (selectedData && selectedData.length > 0) {
      // Pregunta si está todo seleccionado
      if (selectedData.length === dataSource.length) {
        // Pregunta si la data es de conductores o terminales y si está seleccionada la única opción disponible en el slice de filtro
        if (selectedData.length === 1 && dataSource.length === 1) {
          // El item seleccionado del componente pasa a ser el único dato del slice. allSelected es false porque sería innecesario contar con la opción 'All'
          setSelectedItem({
            selectedItems: selectedData,
            allSelected: false,
          });
        } else {
          // El item seleccionado es { id: 0, value: 'All' }, de la copia de la fuente de datos, por lo que se está seleccionando todo
          setSelectedItem({
            selectedItems: [newDataSource[0]],
            allSelected: true,
          });
        }
      } else {
        // Si no poseen el mismo largo entonces no se está seleccionando todo lo disponible
        setSelectedItem({
          selectedItems: selectedData,
          allSelected: false,
        });
      }
    }
  }, []);

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Autocomplete
      disabled={disabled}
      value={selectedItems}
      options={newDataSource}
      inputValue={inputValue}
      multiple
      disableCloseOnSelect
      limitTags={limit}
      size="medium"
      noOptionsText="Not found"
      // Descomentar open para testear más facilmente
      // open
      sx={{
        minWidth: 300,
        maxWidth: 300,
      }}
      onChange={(e, items, reason, details) => {
        // Pregunta si se seleccionó la opción 'Todos'
        if (items.findIndex((i) => i.value === 'All') > -1) {
          setSelectedItem({ selectedItems: items, allSelected: true });
          const returnData = [...newDataSource];
          // Se le quita el elemento { id: 0, value: 'All' } a la fuente de datos
          returnData.shift();
          // Se despacha toda la data al slice de filtro
          onChange(e, returnData, reason, details);
          if (reason === 'selectOption' && items.length === 1 && !shrink)
            setShrink(true);
          return;
        }
        // Aquí se seleccionan las opciones correspondientes y se despachan al slice filtro
        setSelectedItem({ selectedItems: items, allSelected: false });
        onChange(e, items, reason, details);
        // Si se remueve el último item (chip con botón delete), se genera la animación del label
        if (reason === 'removeOption' && items.length < 1 && shrink)
          setShrink(false);
        // Si es el primer elemento seleccionado, se genera la animación
        if (reason === 'selectOption' && items.length === 1 && !shrink)
          setShrink(true);
      }}
      onInputChange={() => {
        if (!shrink) setShrink(true);
      }}
      isOptionEqualToValue={(option, value) => {
        // Validaciones para seleccionar item
        if (option === value) return true;
        if (option.id === value.id) return true;
        if (newRenderFunction(option) === newRenderFunction(value)) return true;
        return option === value;
      }}
      getOptionDisabled={(option) => {
        // Validaciones para deshabilitar opciones cuando está 'Todo' seleccionado
        const selectAllIndex = selectedItems.findIndex(
          (i) => i.value === 'All'
        );
        if (selectAllIndex > -1) {
          if (option.value !== selectedItems[selectAllIndex].value) return true;
          return false;
        }
        return false;
      }}
      PaperComponent={CustomPaper}
      PopperComponent={StyledPopper}
      ListboxComponent={
        ListboxVirtualizedComponent as React.ComponentType<
          React.HTMLAttributes<HTMLElement>
        >
      }
      renderOption={(properties, option, state) => {
        if (allSelected) {
          state.selected = true;
        }
        return (
          <ListItem
            {...properties}
            disablePadding
            sx={{
              minHeight: 24,
              height: smUp ? 36 : 24,
            }}
          >
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              sx={{
                height: smUp ? 36 : 24,
                marginRight: 1,
              }}
              checked={state.selected}
            />
            <Typography noWrap>{newRenderFunction(option)}</Typography>
          </ListItem>
        );
      }}
      getOptionLabel={newRenderFunction}
      renderInput={(params) => {
        const { InputProps, InputLabelProps, ...restParams } = params;
        const { startAdornment, ...restInputProps } = InputProps;
        return (
          <TextField
            {...restParams}
            label={disabled ? `Sin datos de ${label}` : label}
            role="textbox"
            onChange={(e) => setInputValue(e.target.value)}
            // handlers para controlar la animación del label
            onFocus={() => setShrink(true)}
            onBlur={(e) => {
              if (e.target.value) setInputValue('');
              if (!e.target.value && selectedItems.length < 1) setShrink(false);
            }}
            InputLabelProps={{
              shrink,
            }}
            sx={
              disabled
                ? {
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      border: '1px solid grey !important',
                    },
                    '&& .MuiAutocomplete-endAdornment > button > svg': {
                      fill: 'grey !important',
                    },
                  }
                : null
            }
            InputProps={{
              ...restInputProps,
              startAdornment: (
                <Stack
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    overflowY: 'auto',
                    maxWidth: '65%',
                    scrollBehavior: 'smooth',
                    cursor: 'default',
                    ...customScroll,
                  }}
                >
                  {startAdornment}
                </Stack>
              ),
            }}
          />
        );
      }}
      renderTags={(tagValue, getTagProps) => {
        if (allSelected) {
          return (
            <Chip
              size="small"
              variant="outlined"
              label={`All Selected: (${newDataSource.length - 1})`}
            />
          );
        }
        return tagValue.map((option, index) => (
          <Chip
            size="small"
            variant="outlined"
            sx={{
              width: '65% !important',
            }}
            label={newRenderFunction(option)}
            {...getTagProps({ index })}
          />
        ));
      }}
    />
  );
};

export default AutocompleteMultiSelector;
