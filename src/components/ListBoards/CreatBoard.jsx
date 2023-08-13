import Menu from '@mui/material/Menu';
import {Input, Select, Space, Typography} from "antd";
import "./CreateBoard.css";
import {Alert, Button, Container, Grid, Snackbar} from "@mui/material";
import {useEffect, useState} from "react";
import useWorkspaces from "../../store/useWorkspaces.js";
import {useParams} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from "yup";
import WorkspaceService from "../../services/workspace.service.js";
import useWorkspace from "../../store/useWorkspace.js";
// eslint-disable-next-line react/prop-types
const CreatBoard = ({ open, anchorEl, handleClose}) => {
    const IMAGE_BG = ['2.avif', '1.avif', '3.avif', '4.avif'];
    const COLORS_BG = ['5.svg', '6.svg', '7.svg', '8.svg', '9.svg', '10.svg'];
    const [backgroundBroad , setBackground] = useState("2.avif")
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("")
    const handleChange = (url) => {
        setBackground(url)
    }
    const { workspaces } = useWorkspaces();
    const { workspace, setWorkspace } = useWorkspace();
    const { id } = useParams();
    useEffect(() => {
        WorkspaceService.getWorkspaceInfo(id)
            .then((res) => {
                setWorkspace(res.data.workSpace);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const selectWorkspaces = workspaces.map(workspace => ({
        value: workspace._id,
        label: workspace.name
    }));

    const createBoardSchema = Yup.object().shape({
        title: Yup.string().required("Vui lòng nhập Title"),
        visibility: Yup.string().required("Vui lòng nhập chọn visibility"),
        workspace: Yup.string().required("Vui lòng nhập chọn workspace"),
    });

    const formCreateBoard = useFormik({
        initialValues: {
            title: "",
            visibility: "Public",
            workspace: id,
        },
        validationSchema: createBoardSchema,
        onSubmit: (val) => {
            const data = {
                title: val.title,
                visibility: val.visibility,
                workspace: val.workspace,
                backgroundImage: backgroundBroad,
                userId: JSON.parse(localStorage.getItem("user"))._id
            };
            WorkspaceService.createBoard(data)
                .then((res) => {
                    if (res.data.board) {
                        if (res.data.workspaceId === id ){
                            workspace.boards.push({board: res.data.board})
                        }
                        formCreateBoard.resetForm();
                        if (res.data.message){
                            setSuccessMessage(res.data.message);
                        }
                    }
                    if (res.data.errorMessage){
                        setErrorMessage(res.data.errorMessage);
                    }
                    handleClose()
                })
                .catch((err) => {
                    console.log(err)
                });
        },
    });
    return (
        <>
            <Snackbar
                open={!!successMessage}
                autoHideDuration={3000}
                onClose={() => setSuccessMessage("")}
            >
                <Alert onClose={() => setSuccessMessage("")} severity="success" sx={{ width: "100%" }}>
                    {successMessage}
                </Alert>
            </Snackbar>
            <Snackbar
                open={!!errorMessage}
                autoHideDuration={3000}
                onClose={() => setErrorMessage("")}
            >
                <Alert onClose={() => setErrorMessage("")} severity="warning" sx={{ width: "100%" }}>
                    {errorMessage}
                </Alert>

            </Snackbar>

            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
                style={{ margin: "5px"}}
            >
                <div>
                    <Typography variant="h4" className="title">
                        Create board
                    </Typography>
                    <div>
                        <img className="preview-img" src="/create_board.svg" style={{backgroundImage: `url(/${backgroundBroad})`}} />
                    </div>
                    <Container>
                        <form onSubmit={formCreateBoard.handleSubmit} >
                            <Typography variant="h5"  className="label-name" >
                                Backgound
                            </Typography>
                            <div style={{paddingLeft: "5px"}}>
                                <Grid container spacing={1} columns={12}>
                                    {IMAGE_BG.map ( (url, index) =>
                                        <Grid key={index}>
                                            <label>
                                                <input type="radio" name="images" className="chose-img" defaultChecked={index === 0} value={url} />
                                                <img className="backgound-img" src={"/"+url}  onClick={() => handleChange(url)} />
                                            </label>
                                        </Grid>
                                    )}
                                </Grid>
                                <Grid container spacing={1} columns={12}>
                                    {COLORS_BG.map ( (url, index) =>
                                        <Grid key={index}>
                                            <label>
                                                <input type="radio" name="images" className="chose-img" />
                                                <img className="backgound-img bg-color" src={"/"+url} onClick={() => handleChange(url)}/>
                                            </label>
                                        </Grid>
                                    )}
                                </Grid>
                            </div>
                            <Typography variant="h5"  className="label-name" >
                                Board Title
                                <span className="require">*</span>
                            </Typography>
                            <Input placeholder="Title" name='title' onChange={formCreateBoard.handleChange} value={formCreateBoard.values.title}/>
                            <Typography variant="h5"  className="label-name" style={{color: "red"}}>
                                {formCreateBoard.errors.title}
                            </Typography>
                            <Typography variant="h5"  className="label-name" >
                                Workspace
                            </Typography>
                            <Space wrap >
                                <Select
                                    defaultValue={id}
                                    style={{ width: 250 }}
                                    options={selectWorkspaces}
                                    name="workspace"
                                    onChange={(value) => formCreateBoard.setFieldValue("workspace", value)}
                                    value={formCreateBoard.values.workspace}
                                />
                            </Space>

                            <Typography variant="h5"  className="label-name" >
                                Visibility
                            </Typography>
                            <Space wrap>
                                <Select
                                    defaultValue="Public"
                                    style={{ width: 250 }}
                                    options={[
                                        { value: 'Public', label: 'Public' },
                                        { value: 'Private', label: 'Private' },
                                    ]}
                                    name="visibility"
                                    onChange={(value) => formCreateBoard.setFieldValue("visibility", value)}
                                    value={formCreateBoard.values.visibility}
                                />
                            </Space>
                            <Button type="submit" variant="contained" style={{ width: "250px", margin: "15px 0 15px 0", display: "inherit"}}>Create</Button>
                        </form>
                        <div className="footer" >
                            <div className="l4Bk0ZOo4mmgiO">By using images from Unsplash, you agree to their <a
                                href="https://unsplash.com/license" target="_blank">license</a> and <a
                                href="https://unsplash.com/terms" target="_blank">Terms of Service</a></div>
                        </div>
                    </Container>

                </div>
            </Menu>
        </>


    )

}
export default CreatBoard