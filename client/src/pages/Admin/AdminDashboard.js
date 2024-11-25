import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="admin-dashboard container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="admin-details-card">
              <h2 className="dashboard-title">Admin Dashboard</h2>
              <div className="admin-info">
                <p>
                  <span className="info-label">Name:</span> {auth?.user?.name}
                </p>
                <p>
                  <span className="info-label">Email:</span> {auth?.user?.email}
                </p>
                <p>
                  <span className="info-label">Contact:</span> {auth?.user?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
