package webapp.filters;
import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
 







import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import webapp.beans.UserAccount;
import webapp.utils.DBUtils;
import webapp.utils.MyUtils;
@WebFilter(filterName = "cookieFilter", urlPatterns = { "/*" })
public class CookieFilter implements Filter{
	
	public CookieFilter() {
	}
	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
	       HttpSession session = req.getSession();
	 
	       UserAccount userInSession = MyUtils.getLoginedUser(session);
	       // �?ang login.
	       if (userInSession != null) {
	           session.setAttribute("COOKIE_CHECKED", "CHECKED");
	           chain.doFilter(request, response);
	           return;
	       }
	 
	       // �?ã được tạo trong JDBCFilter.
	       Connection conn = MyUtils.getStoredConnection(request);
	 
	       // Có cần kiểm tra Cookie ko?
	       String checked = (String) session.getAttribute("COOKIE_CHECKED");
	       if (checked == null && conn != null) {
	           String userName = MyUtils.getUserNameInCookie(req);
	           try {
	               UserAccount user = DBUtils.findUser(conn, userName);
	               MyUtils.storeLoginedUser(session, user);
	           } catch (SQLException e) {
	               e.printStackTrace();
	           }
	           // �?ã kiểm tra cookie
	           session.setAttribute("COOKIE_CHECKED", "CHECKED");
	       }
	 
	       chain.doFilter(request, response);
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
		
	}

}
