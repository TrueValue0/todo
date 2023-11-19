import React, { useEffect } from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useEventos } from '@/context/EventoProvider';
import { useUsers } from '@/hooks/useUser';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function SelectorIds({ ver }) {
    const { users } = useUsers();
    const { ids, setIds } = useEventos();

    const filtrados = users.sort((a, b) => a.nombre.localeCompare(b.nombre)).filter(value => value.nombre !== 'PRUEBA');

    const handleChange = (event) => {
        const selectedIds = event.target.value;
        setIds(selectedIds);
    };

    useEffect(() => {
        if (!ver) setIds([])
    }, [ver])

    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Comerciales</InputLabel>
                <Select
                    multiple
                    value={ids}
                    onChange={handleChange}
                    input={<OutlinedInput label="Comerciales" />}
                    renderValue={(selected) =>
                        selected
                            .map((id) => {
                                const selectedUser = filtrados.find((user) => user.id === id);
                                return selectedUser ? selectedUser.nombre : '';
                            })
                            .join(', ')
                    }
                    MenuProps={MenuProps}
                >
                    {filtrados.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                            <Checkbox checked={ids.indexOf(user.id) > -1} />
                            <ListItemText primary={user.nombre} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
