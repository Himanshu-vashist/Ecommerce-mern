import React from "react";
import { NavLink } from "react-router-dom";
import { FaPlus, FaBoxOpen, FaClipboardList, FaTasks } from "react-icons/fa";
import "./AdminMenu.css";

const AdminMenu = () => {
  return (
    <div className="text-center">
      <div className="list-group dashboard-menu">
        <h4>Admin Panel</h4>
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
        >
          <span>Create Category</span>
          <FaTasks className="icon" />
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action"
        >
          <span>Create Product</span>
          <FaPlus className="icon" />
        </NavLink>
        <NavLink
          to="/dashboard/admin/products"
          className="list-group-item list-group-item-action"
        >
          <span>Products</span>
          <FaBoxOpen className="icon" />
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="list-group-item list-group-item-action"
        >
          <span>Orders</span>
          <FaClipboardList className="icon" />
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
