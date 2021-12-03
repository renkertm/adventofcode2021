#include <iostream>
#include <fstream>
#include <string>
#include <list>
#include <cmath>

using namespace std;

int main()
{

	string line;
	ifstream file("input.txt");

	list<string> input;

	list<int> bits;

	if (file.is_open()) {
		while (getline(file, line)) {
			input.push_back(line);
			//cout << line << "\n";
		}
		file.close();
	}
	else cout << "Unable to open file";

	for (string i : input) {
		for (int j = 1; j <= i.length(); j++) {
			string bit = i.substr(j - 1, 1);
			if (bits.size() < j) {
				bits.push_back(1);
			}
			if (bit == "1") {
				auto front = bits.begin();
				advance(front, j - 1);
				*front = *front + 1;
			}
			
		}
	}

	string bgamma;
	string bepsilon;
	int gamma = 0;
	int epsilon = 0;
	int c = 0;

	for (int b : bits) {
		int s = input.size();
		int g = static_cast<float>(b) / s > 0.5;
		int e = static_cast<float>(b) / s < 0.5;
		bgamma.append(to_string(g));
		bepsilon.append(to_string(e));
	}

	long long n = stoll(bgamma);
	
	int dec = 0, i = 0, rem;

	while (n != 0) {
		rem = n % 10;
		n /= 10;
		dec += rem * pow(2, i);
		++i;
	}

	gamma = dec;

	n = stoll(bepsilon);

	dec = 0, i = 0;

	while (n != 0) {
		rem = n % 10;
		n /= 10;
		dec += rem * pow(2, i);
		++i;
	}

	epsilon = dec;

	cout << gamma << ", " << epsilon << ", " << gamma * epsilon;

	return 0;
}