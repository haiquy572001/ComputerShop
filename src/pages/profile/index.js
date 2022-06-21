import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../../context/store";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { AuthService } from "../../services/auth.service";
import { actionTypes } from "../../context/reducers";
import { toast } from "react-toastify";

const Profile = ({ open, setOpen }) => {
  const [{ auth, profile }, dispatch] = useMyContext();
  const [openDetail, setOpenDetail] = useState(false);

  const initialState = {
    email: "",
    first_name: "",
    last_name: "",
    address: "",
    phone_number: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { email, first_name, last_name, address, phone_number } = userData;

  useEffect(() => {
    if (profile) {
      setUserData(profile);
    }
  }, [profile]);

  const { mutateAsync } = useMutation(
    "updateInfo",
    () => AuthService.updateInfo(userData),
    {
      onSuccess: (res) => {
        dispatch({
          type: actionTypes.LOADING,
          payload: {
            loading: false,
          },
        });
        toast.success("Create profile successfully");
        setOpenDetail(false);
      },
    }
  );

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({
      type: actionTypes.LOADING,
      payload: {
        loading: true,
      },
    });
    try {
      await mutateAsync(userData);
    } catch (error) {
      dispatch({
        type: actionTypes.LOADING,
        payload: {
          loading: false,
        },
      });
      toast.error(error.response.data.detail || "");
    }
  };

  return (
    <div className="overlayProfile">
      <form className="detailProfileContainer" onSubmit={handleSubmit}>
        <div className="showProfile-header">
          <div className="showProfile-header-name">Profile</div>
          <button
            style={{ outline: "none" }}
            onClick={() => {
              if (setOpen) {
                setOpen(false);
              }
            }}
          >
            <p>X</p>
          </button>
        </div>
        {!openDetail && (
          <>
            <div className="profile-container">
              <div className="profile-detail-content">
                <div className="profile_name">
                  {userData.first_name + " " + userData.last_name}
                </div>
                <div className="profile_field">Email: {userData.email}</div>
                <div className="profile_field">Address: {userData.address}</div>
                <div className="profile_field">
                  Phone Number: {userData.phone_number}
                </div>
              </div>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-center">
              <button
                className="btn btn-success ml-3"
                style={{ width: 120 }}
                onClick={() => setOpenDetail(true)}
              >
                Cập nhật
              </button>
            </div>
          </>
        )}
        {openDetail && (
          <>
            <div className="update-profile-detail-container">
              <div className="form-group">
                <label className="auth_page__email" htmlFor="exampleInputEmail">
                  Email
                </label>
                <input
                  disabled
                  type="email"
                  className="form-control"
                  id="exampleInputEmail"
                  name="email"
                  // onChange={handleChangeInput}
                  value={email}
                />
              </div>
              <div className="d-flex flex-row align-items-center justify-content-between">
                <div className="form-group w-100 mr-2">
                  <label
                    className="auth_page__email"
                    htmlFor="exampleInputFirstname"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputFirstname"
                    name="first_name"
                    onChange={handleChangeInput}
                    value={first_name}
                  />
                </div>

                <div className="form-group w-100 ml-2">
                  <label
                    className="auth_page__email"
                    htmlFor="exampleInputLastname"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputLastname"
                    name="last_name"
                    onChange={handleChangeInput}
                    value={last_name}
                  />
                </div>
              </div>

              <div className="form-group">
                <label
                  className="auth_page__password"
                  htmlFor="exampleInputAddress"
                >
                  Address
                </label>

                <input
                  type="text"
                  className="form-control"
                  id="exampleInputAddress"
                  name="address"
                  onChange={handleChangeInput}
                  value={address}
                />
              </div>

              <div className="form-group">
                <label
                  className="auth_page__password"
                  htmlFor="exampleInputPhone"
                >
                  Phone Number
                </label>

                <input
                  type="number"
                  className="form-control"
                  id="exampleInputPhone"
                  name="phone_number"
                  onChange={handleChangeInput}
                  value={phone_number}
                />
              </div>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-center">
              <button
                className="btn btn-outline-secondary"
                style={{ width: 120 }}
                onClick={() => {
                  if (profile.id === undefined && setOpen) {
                    setOpen(false);
                  } else {
                    setOpenDetail(false);
                  }
                }}
              >
                Huỷ
              </button>
              <button
                className="btn btn-success ml-3"
                style={{ width: 120 }}
                type="submit"
                disabled={
                  first_name && last_name && address && phone_number
                    ? false
                    : true
                }
              >
                Cập nhật
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Profile;
