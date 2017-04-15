package webapp.utils;
import java.sql.Connection;

import javax.servlet.ServletRequest;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
 





import webapp.beans.UserAccount;
public class MyUtils {
	public static final String ATT_NAME_CONNECTION = "ATTRIBUTE_FOR_CONNECTION";
	private static final String ATT_NAME_USER_NAME = "ATTRIBUTE_FOR_STORE_USER_NAME_IN_COOKIE";
	public static void storeConnection(ServletRequest request, Connection conn){
		request.setAttribute(ATT_NAME_CONNECTION, conn);
	} 
	public static Connection getStoredConnection(ServletRequest request){
		Connection conn = (Connection) request.getAttribute(ATT_NAME_CONNECTION);
		return conn;
	}
// Lưu trữ thông tin ngư�?i dùng đã login vào Session
   public static void storeLoginedUser(HttpSession session, UserAccount loginedUser) {
       // Trên JSP có thể truy cập ${loginedUser}
       session.setAttribute("loginedUser", loginedUser);
   }
 
   // Lấy thông tin ngư�?i dùng đã login trong session.
   public static UserAccount getLoginedUser(HttpSession session) {
       UserAccount loginedUser = (UserAccount) session.getAttribute("loginedUser");
       return loginedUser;
   }
 
   // Lưu thông tin ngư�?i dùng vào Cookie.
   public static void storeUserCookie(HttpServletResponse response, UserAccount user) {
       System.out.println("Store user cookie");
       Cookie cookieUserName = new Cookie(ATT_NAME_USER_NAME, user.getUserName());
       // 1 ngày (�?ã đổi ra giây)
       cookieUserName.setMaxAge(24 * 60 * 60);
       response.addCookie(cookieUserName);
   }
 
   public static String getUserNameInCookie(HttpServletRequest request) {
       Cookie[] cookies = request.getCookies();
       if (cookies != null) {
           for (Cookie cookie : cookies) {
               if (ATT_NAME_USER_NAME.equals(cookie.getName())) {
                   return cookie.getValue();
               }
           }
       }
       return null;
   }
 
   // Xóa Cookie của ngư�?i dùng
   public static void deleteUserCookie(HttpServletResponse response) {
       Cookie cookieUserName = new Cookie(ATT_NAME_USER_NAME, null);
       // 0 giây. (Hết hạn ngay lập tức)
       cookieUserName.setMaxAge(0);
       response.addCookie(cookieUserName);
   }
}
