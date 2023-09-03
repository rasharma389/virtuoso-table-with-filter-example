import { Box, Button, FormControlLabel, FormGroup, Grid, Switch, TextField } from "@mui/material"

export const ColumnsFilter = (props: any) => {

    return <Box sx={{ width: '200px', height: '300px', minHeight: '200px', padding: '10px', display: "flex", flexDirection: 'column', justifyContent: 'space-between', overflow: 'hidden' }}>
        <TextField id="standard-basic" label="Find Column" variant="standard" placeholder="Column title"/>
        <Box sx={{ flex: 1, justifyContent: 'flex-start', overflow: 'auto', padding: '10px' }}>
            <FormGroup sx={{gap: 1}}>
                {/* {['menu1', 'menu2','menu1', 'menu2','menu1', 'menu2','menu1', 'menu2','menu1', 'menu2','menu1', 'menu2','menu1', 'menu2','menu1', 'menu2'].map(item => (
                    <FormControlLabel control={<Switch size="small" />} label={item} />
                ))} */}
                {props.columns.map((item: any) => (
                    <FormControlLabel control={<Switch size="small" 
                        value={item}
                        checked={props.checkedItems.includes(item)}
                        onChange={(event) => props.handleChange(event)} 
                    />} label={item} />
                ))}
                </FormGroup>
            </Box>
        <Grid container spacing={2}>
            <Grid item xs={6} md={6}>
                <Button onClick={props.handleShowAll}>Show All</Button>
            </Grid>
            <Grid item xs={6} md={6}>
                <Button onClick={props.handleHideAll}>Hide All</Button>
            </Grid>
        </Grid>
    </Box>

}