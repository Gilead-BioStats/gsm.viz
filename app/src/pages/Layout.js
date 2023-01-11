import { Outlet, Link } from 'react-router-dom';
import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Layout = ({ setPlot }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPlot(event.currentTarget.innerText);
        setAnchorEl(null);
    };

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <button
                            className="menu-button"
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            Plots
                        </button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <Link
                                to="/plots"
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                            >
                                <MenuItem onClick={handleClose}>
                                    BarChart
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    ScatterPlot
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    TimeSeries (Continuous)
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    TimeSeries (Discrete)
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    TimeSeries (CI)
                                </MenuItem>
                            </Link>
                        </Menu>
                    </li>
                    {/*
                        <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    */}
                </ul>
            </nav>

            <Outlet />
        </>
    );
};

export default Layout;
