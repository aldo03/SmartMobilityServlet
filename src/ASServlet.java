
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

public class ASServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final String MSG_ID = "msgid";
	private static final String SERV_MSG = "servletmsg";

	public ASServlet() {
	}

	@Override
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("Request Received");
		doPost(request, response);
	}

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("text/event-stream");
		response.addHeader("Access-Control-Allow-Origin", "*");
		response.setCharacterEncoding("UTF-8");

		PrintWriter writer = response.getWriter();

		while (true) {
			JSONObject obj = new JSONObject();
			try {
				obj.put(MSG_ID, SERV_MSG);
			} catch (JSONException e) { 
				e.printStackTrace();
			}
			String req = obj.toString();
			String res = HttpUtils.POST(req);
			System.out.println(res);
			writer.write("data: " + res + "\n\n");
			writer.flush();
		}
	}
}
