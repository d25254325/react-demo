package utils;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import beans.UserAccount;

public class DBUtils {
	public static UserAccount findUser(Connection conn, String userName, String passWord) throws SQLException{
		String sql = "Select a.userName, a.passWord, a.admin, a.id, a.name, a.CMND from user_table a "
	              + " where a.userName = ? and a.passWord= ?";
	 
	      PreparedStatement pstm = conn.prepareStatement(sql);
	      pstm.setString(1, userName);
	      pstm.setString(2, passWord);
	      ResultSet rs = pstm.executeQuery();
	 
	      if (rs.next()) {
	          int idUser = rs.getInt("id");
	          String cmnd = rs.getString("CMND");
	          String nameOfUser = rs.getString("name");
	          boolean admin = rs.getBoolean("admin");
	          UserAccount user = new UserAccount();
	          user.setUserName(userName);
	          user.setPassWord(passWord);
	          user.setId(idUser);
	          user.setCmnd(cmnd);
	          user.setName(nameOfUser);
	          user.setAdmin(admin);
	          return user;
	      }
	      return null;
	}
	public static UserAccount findUser(Connection conn, String userName) throws SQLException {
		 
	      String sql = "Select a.userName, a.passWord, a.admin, a.id, a.name, a.CMND from user_table a " + " where a.userName = ? ";
	 
	      PreparedStatement pstm = conn.prepareStatement(sql);
	      pstm.setString(1, userName);
	 
	      ResultSet rs = pstm.executeQuery();
	 
	      if (rs.next()) {
	    	  int idUser = rs.getInt("id");
	          String cmnd = rs.getString("CMND");
	          String nameOfUser = rs.getString("name");
	          boolean admin = rs.getBoolean("admin");
	          String password = rs.getString("passWord");
	          UserAccount user = new UserAccount();
	          user.setUserName(userName);
	          user.setPassWord(password);
	          user.setId(idUser);
	          user.setCmnd(cmnd);
	          user.setName(nameOfUser);
	          user.setAdmin(admin);
	          return user;
	      }
	      return null;
	  }
}
