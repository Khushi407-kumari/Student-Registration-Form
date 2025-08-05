import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;

public class RegisterServlet extends HttpServlet {

    // Database credentials
    private static final String DB_URL = "jdbc:mysql://localhost:3306/student_db";
    private static final String DB_USER = "root";         // change if needed
    private static final String DB_PASS = "password";     // change if needed

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/plain");
        PrintWriter out = response.getWriter();

        String fullName = request.getParameter("fullName");
        String email = request.getParameter("email");
        String phone = request.getParameter("phone");

        // Input validations (basic)
        if (fullName == null || fullName.trim().isEmpty() ||
            email == null || email.trim().isEmpty() ||
            phone == null || phone.trim().isEmpty()) {
            out.println("All fields are required.");
            return;
        }

        try {
            // Load JDBC driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Connect to DB
            Connection con = DriverManager.getConnection(DB_URL, DB_USER, DB_PASS);

            // Prepare SQL
            String sql = "INSERT INTO students (full_name, email, phone) VALUES (?, ?, ?)";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, fullName);
            ps.setString(2, email);
            ps.setString(3, phone);

            int row = ps.executeUpdate();

            if (row > 0) {
                out.println("Student registered successfully.");
            } else {
                out.println("Registration failed.");
            }

            ps.close();
            con.close();

        } catch (SQLIntegrityConstraintViolationException e) {
            out.println("This email is already registered.");
        } catch (Exception e) {
            e.printStackTrace(out);
        }
    }
}
