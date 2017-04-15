package webapp.filters;
import java.io.IOException;
import java.sql.Connection;
import java.util.Collection;
import java.util.Map;
 




import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;

import webapp.conn.ConnectionUtils;
import webapp.utils.MyUtils;
@WebFilter(filterName="jdbcFilter", urlPatterns = { "/*" })
public class JDBCFilter implements Filter{
	
	public JDBCFilter() {
	}
	
	@Override
	public void destroy() {
		// TODO Auto-generated method stub	
	}
	
  // Kiểm tra xem request hiện tại là 1 Servlet?
   private boolean needJDBC(HttpServletRequest request) {  
       System.out.println("JDBC Filter");
       //
       // Servlet Url-pattern: /spath/*
       //
       // => /spath
       String servletPath = request.getServletPath();
       // => /abc/mnp
       String pathInfo = request.getPathInfo();
 
       String urlPattern = servletPath;
 
       if (pathInfo != null) {
           // => /spath/*
           urlPattern = servletPath + "/*";
       }
        
       // Key: servletName.
       // Value: ServletRegistration
       Map<String, ? extends ServletRegistration> servletRegistrations = request.getServletContext()
               .getServletRegistrations();  
 
       // Tập hợp tất cả các Servlet trong WebApp của bạn.
       Collection<? extends ServletRegistration> values = servletRegistrations.values();
       for (ServletRegistration sr : values) {
           Collection<String> mappings = sr.getMappings();
           if (mappings.contains(urlPattern)) {
               return true;
           }
       }
       return false;
   }

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		HttpServletRequest req = (HttpServletRequest) request;
		 
	       //
	       // Chỉ mở kết nối đối với các request có đư�?ng dẫn đặc biệt cần
	       // connection. (Chẳng hạn đư�?ng dẫn tới các servlet, jsp, ..)
	       //
	       // Tránh tình trạng mở connection với các yêu cầu thông thư�?ng
	       // (chẳng hạn image, css, javascript,... )
	       //
	       if (this.needJDBC(req)) {
	            
	           System.out.println("Open Connection for: " + req.getServletPath());
	            
	           Connection conn = null;
	           try {
	               // Tạo đối tượng Connection kết nối database.
	               conn = ConnectionUtils.getConnection();
	               // Sét tự động commit false, để chủ động đi�?u khiển.
	               conn.setAutoCommit(false);
	 
	               // Lưu trữ vào attribute của request.
	               MyUtils.storeConnection(request, conn);
	 
	               // Cho phép request đi tiếp.
	               chain.doFilter(request, response);
	 
	               // G�?i commit() để commit giao dịch với DB.
	               conn.commit();
	           } catch (Exception e) {
	               e.printStackTrace();
	               ConnectionUtils.rollbackQuietly(conn);
	               throw new ServletException();
	           } finally {
	               ConnectionUtils.closeQuietly(conn);
	           }
	       }
	       // Với các request thông thư�?ng (image,css,html,..)
	       // không cần mở connection, cho tiếp tục.
	       else {
	           // Cho phép request đi tiếp.
	           chain.doFilter(request, response);
	       }
		
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
		
	}

}