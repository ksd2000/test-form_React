import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import InputIcon from '@material-ui/icons/Input';
import Forma from './Forma';


export const userDetailContext = React.createContext();

function loadScript(src, position, id) {

  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

function App() {

  const [showForm, setFormStatus] = useState(false);
  const viewData = () => setFormStatus(true);

  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const loaded = React.useRef(false);

  const [userDetails] = useState({      //иммитация получения данных
    country: 'hkjh',
    city: 'ghj',
    index:'',
    street:'lkj',
    streettype: 'hgf',
    roomtype: 'fhhh',
    roomnumber: '235'
  });

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyBwRp1e12ec1vOTtGiA4fcCt2sCUS78UYc&libraries=places',
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    
    <userDetailContext.Provider value={userDetails}>
      {console.log(userDetails)}
      {console.log(showForm)}
      <div className="app">Введите адрес
        <Grid container alignItems="center">
          <Autocomplete
            className='address'
            id="google-map-demo"
            style={{ width: 300, marginTop: 10 }}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            onChange={(event, newValue) => {
              setOptions(newValue ? [newValue, ...options] : options);
              setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              setInputValue(newInputValue);
            }}
            renderInput={(params) => (
              <TextField {...params} label="Add a location" variant="outlined" fullWidth />
            )}

            renderOption={(option) => {
              const matches = option.structured_formatting.main_text_matched_substrings;
              const parts = parse(
                option.structured_formatting.main_text,
                matches.map((match) => [match.offset, match.offset + match.length]),
              );
              return (
                <Grid container alignItems="center">
                  <Grid item>
                    <LocationOnIcon className={classes.icon} />
                  </Grid>
                  <Grid item xs>
                    {parts.map((part, index) => (
                      <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                        {part.text}
                      </span>
                    ))}
                    <Typography variant="body2" color="textSecondary">
                      {option.structured_formatting.secondary_text}
                    </Typography>
                  </Grid>
                </Grid>
              );
            }}
          />
          <InputIcon style={{ fontSize: '2.5rem', marginLeft: '0.3em' }} onClick={viewData} />
        </Grid>

        {showForm && (
        <Forma userDetails={userDetails} />
        )}

      </div>
    </userDetailContext.Provider>
  );
}

export default App;
